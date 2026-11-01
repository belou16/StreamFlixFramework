// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Tous les appels réseau de l'application passent par ce fichier.
import { config } from '../config'
import type { SelectionPayload, SelectionResponse } from '../types/list'
import type { Show, ShowSearchResult } from '../types/show'
import type { Credentials, LoginResponse } from '../types/user'

// status vaut null pour une panne réseau, et le code HTTP pour une erreur du serveur.
export class ApiError extends Error {
  readonly status: number | null

  constructor(message: string, status: number | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// T décrit ce que renvoie l'API : la réponse est typée dès sa réception, jamais en any.
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  let response: Response

  try {
    response = await fetch(url, options)
  } catch (error) {
    // Requête annulée parce que l'on a quitté la page : ce n'est pas une panne.
    if (options.signal?.aborted) throw error
    throw new ApiError('Le serveur est injoignable. Vérifiez votre connexion puis réessayez.')
  }

  // fetch ne rejette pas sur un 404 ou un 500 : on teste response.ok.
  if (!response.ok) {
    throw new ApiError(
      `Le serveur a répondu par une erreur (code ${response.status}).`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}

function post<T>(url: string, body: unknown): Promise<T> {
  return request<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(body),
  })
}

export function getShows(page: number, signal?: AbortSignal): Promise<Show[]> {
  return request<Show[]>(`${config.catalogApiUrl}/shows?page=${page}`, { signal })
}

export function getShowById(showId: number, signal?: AbortSignal): Promise<Show> {
  return request<Show>(`${config.catalogApiUrl}/shows/${showId}`, { signal })
}

// Recherche côté serveur (10 résultats au plus). Le catalogue préfère filtrer en mémoire les
// séries déjà reçues : aucune requête à chaque frappe, et le filtre de genre reste cohérent.
export async function searchShows(query: string, signal?: AbortSignal): Promise<Show[]> {
  const url = `${config.catalogApiUrl}/search/shows?q=${encodeURIComponent(query)}`
  const results = await request<ShowSearchResult[]>(url, { signal })

  // L'API renvoie des objets { score, show } : seule la série nous intéresse.
  return results.map((result) => result.show)
}

export function sendSelection(payload: SelectionPayload): Promise<SelectionResponse> {
  return post<SelectionResponse>(`${config.selectionApiUrl}/posts`, payload)
}

export function login(credentials: Credentials): Promise<LoginResponse> {
  return post<LoginResponse>(`${config.authApiUrl}/auth/login`, credentials)
}
