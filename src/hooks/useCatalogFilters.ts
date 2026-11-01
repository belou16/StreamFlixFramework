// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useMemo, useState } from 'react'
import type { Show } from '../types/show'
import { DEFAULT_SORT, extractGenres, filterAndSortShows, type SortKey } from '../utils/catalog'
import { useDebounce } from './useDebounce'

const SEARCH_DELAY_MS = 300

// Recherche, genre et tri du catalogue, et la liste qui en résulte, sans nouvel appel à l'API.
export function useCatalogFilters(shows: Show[]) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT)

  // La recherche s'applique quand l'utilisateur arrête de taper, pas à chaque lettre.
  const debouncedQuery = useDebounce(query, SEARCH_DELAY_MS)

  const genres = useMemo(() => extractGenres(shows), [shows])

  const visibleShows = useMemo(
    () => filterAndSortShows(shows, { query: debouncedQuery, genre, sort }),
    [shows, debouncedQuery, genre, sort],
  )

  function resetFilters() {
    setQuery('')
    setGenre('')
    setSort(DEFAULT_SORT)
  }

  return {
    query,
    setQuery,
    debouncedQuery,
    genre,
    setGenre,
    sort,
    setSort,
    genres,
    visibleShows,
    resetFilters,
  }
}
