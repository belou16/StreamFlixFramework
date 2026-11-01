// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Ma liste : création d'une entrée, contrôle des données relues et charge utile d'envoi.
import type { ListEntry, SelectionPayload } from '../types/list'
import type { Show } from '../types/show'
import { getYear } from './show'
import { MAX_PRIORITY, MIN_PRIORITY } from './validation'

// La nouvelle série prend la priorité suivant celles déjà présentes, sans dépasser 10.
export function createListEntry(show: Show, listSize: number): ListEntry {
  return {
    showId: show.id,
    name: show.name,
    year: getYear(show),
    posterUrl: show.image?.medium ?? null,
    priority: Math.min(listSize + 1, MAX_PRIORITY),
  }
}

function isListEntry(value: unknown): value is ListEntry {
  if (typeof value !== 'object' || value === null) return false

  const entry = value as Record<string, unknown>
  return (
    typeof entry.showId === 'number' &&
    typeof entry.name === 'string' &&
    (typeof entry.year === 'number' || entry.year === null) &&
    (typeof entry.posterUrl === 'string' || entry.posterUrl === null) &&
    typeof entry.priority === 'number' &&
    Number.isInteger(entry.priority) &&
    entry.priority >= MIN_PRIORITY &&
    entry.priority <= MAX_PRIORITY
  )
}

// La liste relue dans localStorage a pu être modifiée à la main : on vérifie sa forme.
export function isListEntryList(value: unknown): value is ListEntry[] {
  return Array.isArray(value) && value.every(isListEntry)
}

// Charge utile de POST /posts, séries rangées par priorité. Le nom et l'e-mail restent côté client.
export function buildSelectionPayload(
  userId: number,
  entries: ListEntry[],
  date: string,
): SelectionPayload {
  const shows = entries
    .map(({ showId, priority }) => ({ showId, priority }))
    .toSorted((a, b) => a.priority - b.priority)

  return { userId, date, shows }
}
