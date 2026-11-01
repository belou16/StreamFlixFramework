// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './api'

const MAX_RETRIES = 2
const FIVE_MINUTES = 5 * 60 * 1000

// Nouvel essai après une panne réseau ou une erreur serveur (5xx). Aucun après une erreur 4xx
// (404, 400…) : la même requête échouerait de la même façon.
function shouldRetry(failureCount: number, error: Error): boolean {
  const isClientError = error instanceof ApiError && error.status !== null && error.status < 500
  return !isClientError && failureCount < MAX_RETRIES
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Le catalogue change peu : revenir sur une page réutilise le cache au lieu de rappeler l'API.
      staleTime: FIVE_MINUTES,
      retry: shouldRetry,
    },
  },
})
