// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { ApiError } from '../services/api'

// Message lisible par l'utilisateur, quelle que soit l'erreur reçue.
export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : 'Une erreur inattendue est survenue.'
}

// Identifiant valide, mais inconnu de l'API.
export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404
}

// Identifiants refusés par le service de connexion.
export function isInvalidCredentialsError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 400 || error.status === 401)
}
