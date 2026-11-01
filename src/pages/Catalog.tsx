// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { AsyncContent } from '../components/AsyncContent'
import { CatalogBrowser } from '../components/CatalogBrowser'
import { PageMeta } from '../components/PageMeta'
import { useShows } from '../hooks/useShows'

export function Catalog() {
  const showsQuery = useShows()

  return (
    <section aria-labelledby="catalog-title">
      <PageMeta
        title="Catalogue des séries"
        description="Parcourez le catalogue StreamFlix : recherchez une série, filtrez par genre et triez par note ou par année pour trouver quoi regarder."
      />
      <h1 id="catalog-title" className="page-title">
        Catalogue
      </h1>
      <p className="page-intro">
        Trouvez quoi regarder : recherchez une série par son titre, filtrez par genre, triez par
        note ou par année, puis ajoutez vos coups de cœur à votre liste.
      </p>

      <AsyncContent
        query={showsQuery}
        loadingLabel="Chargement des séries…"
        errorTitle="Le catalogue est indisponible pour le moment."
      >
        {(shows) => <CatalogBrowser shows={shows} />}
      </AsyncContent>
    </section>
  )
}
