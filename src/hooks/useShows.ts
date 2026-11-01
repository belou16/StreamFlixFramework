// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Requêtes du catalogue. TanStack Query gère le chargement, l'erreur, les données et le cache.
import { skipToken, useQuery } from '@tanstack/react-query'
import { getShowById, getShows } from '../services/api'

const CATALOG_PAGE = 0

export function useShows() {
  return useQuery({
    queryKey: ['shows', CATALOG_PAGE],
    queryFn: ({ signal }) => getShows(CATALOG_PAGE, signal),
  })
}

// showId vaut null quand l'identifiant de l'URL est invalide : aucune requête ne part alors.
export function useShow(showId: number | null) {
  return useQuery({
    // L'identifiant fait partie de la clé : changer de fiche relance la bonne requête.
    queryKey: ['show', showId],
    queryFn: showId === null ? skipToken : ({ signal }) => getShowById(showId, signal),
  })
}
