// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import type { Show } from '../types/show'
import { formatCount } from '../utils/text'
import { GenreFilter } from './GenreFilter'
import { SearchBar } from './SearchBar'
import { ShowList } from './ShowList'
import { SortSelect } from './SortSelect'
import { StatePanel } from './StatePanel'
import './CatalogBrowser.css'

// Catalogue chargé : la recherche, le genre et le tri agissent sur une même liste.
export function CatalogBrowser({ shows }: { shows: Show[] }) {
  const filters = useCatalogFilters(shows)
  const { visibleShows, debouncedQuery } = filters

  if (shows.length === 0) {
    return (
      <StatePanel variant="empty" title="Le catalogue ne contient aucune série pour le moment." />
    )
  }

  return (
    <>
      <form
        className="catalog-filters"
        role="search"
        aria-label="Filtrer le catalogue"
        onSubmit={(event) => event.preventDefault()}
      >
        <SearchBar value={filters.query} onChange={filters.setQuery} />
        <GenreFilter genres={filters.genres} value={filters.genre} onChange={filters.setGenre} />
        <SortSelect value={filters.sort} onChange={filters.setSort} />
      </form>

      <p className="results-count" aria-live="polite">
        {formatCount(visibleShows.length, 'série affichée', 'séries affichées')} sur {shows.length}
      </p>

      {visibleShows.length > 0 ? (
        <ShowList shows={visibleShows} />
      ) : (
        <StatePanel
          variant="empty"
          title={
            debouncedQuery
              ? `Aucune série ne correspond à « ${debouncedQuery} ».`
              : 'Aucune série ne correspond à ces filtres.'
          }
          message="Essayez un autre titre ou retirez le filtre de genre."
        >
          <button type="button" className="button button-secondary" onClick={filters.resetFilters}>
            Réinitialiser les filtres
          </button>
        </StatePanel>
      )}
    </>
  )
}
