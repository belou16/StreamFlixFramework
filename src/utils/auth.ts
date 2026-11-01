// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Session : contrôle des données relues et page de retour après la connexion.
import { paths } from '../paths'
import type { AuthSession } from '../types/user'

// La session relue dans localStorage a pu être modifiée à la main : on vérifie sa forme.
export function isAuthSession(value: unknown): value is AuthSession {
  if (typeof value !== 'object' || value === null) return false

  const { user, accessToken } = value as Record<string, unknown>
  if (typeof accessToken !== 'string' || typeof user !== 'object' || user === null) return false

  const { id, username, firstName } = user as Record<string, unknown>
  return typeof id === 'number' && typeof username === 'string' && typeof firstName === 'string'
}

// Transmis à /login par la page de départ, pour y revenir une fois connecté.
export interface LoginRedirectState {
  from: string
}

// location.state est de type unknown : on le vérifie avant de s'en servir.
export function getRedirectPath(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    const { from } = state
    // Uniquement un chemin interne : pas de redirection vers un autre site.
    if (typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')) return from
  }
  return paths.catalog
}
