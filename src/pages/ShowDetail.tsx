// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { Link, useParams } from 'react-router-dom'
import { AsyncContent } from '../components/AsyncContent'
import { PageMeta } from '../components/PageMeta'
import { ShowOverview } from '../components/ShowOverview'
import { StatePanel } from '../components/StatePanel'
import { useShow } from '../hooks/useShows'
import { paths } from '../paths'
import { isNotFoundError } from '../utils/errors'
import { describeShow, parseShowId } from '../utils/show'

export function ShowDetail() {
  const { id } = useParams()
  // Identifiant rejeté avant tout appel s'il n'est pas un entier positif.
  const showId = parseShowId(id)
  const showQuery = useShow(showId)
  const show = showQuery.data

  // Identifiant invalide, ou valide mais inconnu de l'API : « introuvable », sans bouton Réessayer.
  if (showId === null || isNotFoundError(showQuery.error)) {
    return (
      <>
        <PageMeta
          title="Fiche introuvable"
          description="Cette fiche de série n'existe pas."
          noIndex
        />
        <StatePanel
          variant="not-found"
          title="Fiche introuvable"
          headingLevel={1}
          message={
            showId === null
              ? `L'identifiant « ${id} » n'est pas valide : il doit s'agir d'un nombre entier positif.`
              : `Aucune série ne correspond à l'identifiant ${showId}.`
          }
        >
          <Link className="button button-secondary" to={paths.catalog}>
            Retour au catalogue
          </Link>
        </StatePanel>
      </>
    )
  }

  return (
    <>
      <PageMeta
        title={show?.name ?? 'Fiche série'}
        description={show ? describeShow(show) : "Fiche détaillée d'une série sur StreamFlix."}
      />
      <Link className="back-link" to={paths.catalog}>
        <span aria-hidden="true">←</span> Retour au catalogue
      </Link>

      <AsyncContent
        query={showQuery}
        loadingLabel="Chargement de la fiche…"
        errorTitle="Impossible de charger cette fiche."
      >
        {/* key : une autre fiche repart d'un état neuf (message de confirmation, affiche). */}
        {(loadedShow) => <ShowOverview key={loadedShow.id} show={loadedShow} />}
      </AsyncContent>
    </>
  )
}
