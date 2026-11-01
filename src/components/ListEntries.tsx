// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { Link } from 'react-router-dom'
import type { InvalidPriorities } from '../hooks/useSelectionForm'
import { paths } from '../paths'
import type { ListEntry } from '../types/list'
import { ListEntryRow } from './ListEntryRow'
import { StatePanel } from './StatePanel'

interface ListEntriesProps {
  entries: ListEntry[]
  invalidPriorities: InvalidPriorities
  // Règle « au moins une série », affichée quand la liste est vide.
  emptyError?: string
  onPriorityChange: (showId: number, value: string) => void
  onRemove: (showId: number) => void
  onClear: () => void
}

// Partie « séries et priorités » du formulaire d'envoi.
export function ListEntries({
  entries,
  invalidPriorities,
  emptyError,
  onPriorityChange,
  onRemove,
  onClear,
}: ListEntriesProps) {
  return (
    <fieldset className="form-section">
      <legend className="section-title">Séries et priorités</legend>

      {entries.length === 0 ? (
        <StatePanel variant="empty" title="Votre liste est vide." message={emptyError}>
          <Link className="button button-secondary" to={paths.catalog}>
            Parcourir le catalogue
          </Link>
        </StatePanel>
      ) : (
        <>
          <p className="form-hint">
            Attribuez à chaque série une priorité de 1 (à voir en premier) à 10.
          </p>
          <ul className="list-entries">
            {entries.map((entry) => (
              <ListEntryRow
                key={entry.showId}
                entry={entry}
                invalidPriority={invalidPriorities[entry.showId]}
                onPriorityChange={onPriorityChange}
                onRemove={onRemove}
              />
            ))}
          </ul>
          <button type="button" className="button button-secondary" onClick={onClear}>
            Vider ma liste
          </button>
        </>
      )}
    </fieldset>
  )
}
