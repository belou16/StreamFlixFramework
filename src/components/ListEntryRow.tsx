// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../paths'
import type { ListEntry } from '../types/list'
import { formatYear } from '../utils/show'
import { MAX_PRIORITY, MIN_PRIORITY, PRIORITY_ERROR } from '../utils/validation'
import { Poster } from './Poster'
import { TextField } from './TextField'
import './ListEntryRow.css'

interface ListEntryRowProps {
  entry: ListEntry
  // Saisie refusée (« 12 », champ vide…) ; absente quand la priorité enregistrée est valide.
  invalidPriority?: string
  onPriorityChange: (showId: number, value: string) => void
  onRemove: (showId: number) => void
}

// memo : modifier une priorité ne re-rend que la ligne concernée.
export const ListEntryRow = memo(function ListEntryRow({
  entry,
  invalidPriority,
  onPriorityChange,
  onRemove,
}: ListEntryRowProps) {
  return (
    <li className="list-entry">
      <div className="list-entry-poster">
        <Poster src={entry.posterUrl} title={entry.name} />
      </div>

      <div className="list-entry-info">
        <h2 className="list-entry-title">
          <Link to={paths.show(entry.showId)}>{entry.name}</Link>
        </h2>
        <p className="list-entry-year">{formatYear(entry.year)}</p>
      </div>

      <div className="list-entry-controls">
        <TextField
          id={`priority-${entry.showId}`}
          label="Priorité"
          type="number"
          inputMode="numeric"
          min={MIN_PRIORITY}
          max={MAX_PRIORITY}
          step={1}
          required
          value={invalidPriority ?? String(entry.priority)}
          error={invalidPriority === undefined ? undefined : PRIORITY_ERROR}
          onChange={(event) => onPriorityChange(entry.showId, event.target.value)}
        />
        <button
          type="button"
          className="button button-secondary"
          onClick={() => onRemove(entry.showId)}
        >
          Retirer<span className="visually-hidden"> {entry.name} de ma liste</span>
        </button>
      </div>
    </li>
  )
})
