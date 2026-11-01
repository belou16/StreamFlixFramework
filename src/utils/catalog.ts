// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Recherche, filtre et tri du catalogue : fonctions pures, indépendantes de React.
import type { Show } from '../types/show'
import { getRating, getYear } from './show'
import { normalizeText } from './text'

export const SORT_KEYS = ['rating-desc', 'rating-asc', 'year-desc', 'year-asc'] as const
export type SortKey = (typeof SORT_KEYS)[number]
export const DEFAULT_SORT: SortKey = 'rating-desc'

interface SortRule {
  getValue: (show: Show) => number | null
  direction: 1 | -1 // 1 : croissant, -1 : décroissant
}

const SORT_RULES: Record<SortKey, SortRule> = {
  'rating-desc': { getValue: getRating, direction: -1 },
  'rating-asc': { getValue: getRating, direction: 1 },
  'year-desc': { getValue: getYear, direction: -1 },
  'year-asc': { getValue: getYear, direction: 1 },
}

export interface CatalogFilters {
  query: string
  genre: string // chaîne vide : tous les genres
  sort: SortKey
}

// Les valeurs manquantes vont toujours en fin de liste, quel que soit le sens du tri.
function compareNullable(a: number | null, b: number | null, direction: 1 | -1): number {
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1

  return (a - b) * direction
}

// Genres présents dans les séries reçues, sans doublon, par ordre alphabétique.
export function extractGenres(shows: Show[]): string[] {
  const genres = new Set(shows.flatMap((show) => show.genres))
  return [...genres].toSorted((a, b) => a.localeCompare(b, 'fr'))
}

export function filterAndSortShows(shows: Show[], { query, genre, sort }: CatalogFilters): Show[] {
  const searchedText = normalizeText(query.trim())
  const { getValue, direction } = SORT_RULES[sort]

  // toSorted() renvoie un nouveau tableau : les séries gardées en cache ne sont jamais modifiées.
  return shows
    .filter((show) => normalizeText(show.name).includes(searchedText))
    .filter((show) => genre === '' || show.genres.includes(genre))
    .toSorted((a, b) => compareNullable(getValue(a), getValue(b), direction))
}
