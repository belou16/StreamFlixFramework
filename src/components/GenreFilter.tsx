// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { SelectField } from './SelectField'

interface GenreFilterProps {
  genres: string[] // déduits des séries reçues
  value: string
  onChange: (genre: string) => void
}

export function GenreFilter({ genres, value, onChange }: GenreFilterProps) {
  // La valeur vide correspond à « Tous les genres » : aucun filtre.
  const options = [
    { value: '', label: 'Tous les genres' },
    ...genres.map((genre) => ({ value: genre, label: genre })),
  ]

  return (
    <SelectField id="genre" label="Genre" value={value} options={options} onChange={onChange} />
  )
}
