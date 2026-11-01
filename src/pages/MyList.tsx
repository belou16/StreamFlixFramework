// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { PageMeta } from '../components/PageMeta'
import { SelectionForm } from '../components/SelectionForm'
import { useMyList } from '../context/my-list-context'
import { formatCount } from '../utils/text'

export function MyList() {
  const { entries } = useMyList()

  return (
    <section aria-labelledby="my-list-title">
      <PageMeta
        title="Ma liste"
        description="Votre liste StreamFlix : classez les séries à voir par priorité puis envoyez votre sélection."
        noIndex
      />
      <h1 id="my-list-title" className="page-title">
        Ma liste
      </h1>
      <p className="results-count" aria-live="polite">
        {formatCount(entries.length, 'série retenue', 'séries retenues')}
      </p>

      <SelectionForm />
    </section>
  )
}
