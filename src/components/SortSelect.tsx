// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { SORT_KEYS, type SortKey } from '../utils/catalog'
import { SelectField } from './SelectField'

const SORT_LABELS: Record<SortKey, string> = {
  'rating-desc': 'Meilleure note',
  'rating-asc': 'Moins bonne note',
  'year-desc': 'Plus récentes',
  'year-asc': 'Plus anciennes',
}

const SORT_OPTIONS = SORT_KEYS.map((key) => ({ value: key, label: SORT_LABELS[key] }))

interface SortSelectProps {
  value: SortKey
  onChange: (sort: SortKey) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <SelectField
      id="sort"
      label="Trier par"
      value={value}
      options={SORT_OPTIONS}
      onChange={onChange}
    />
  )
}
