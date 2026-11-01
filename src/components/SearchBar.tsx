// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { TextField } from './TextField'

interface SearchBarProps {
  value: string
  onChange: (query: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      id="search"
      label="Rechercher une série"
      type="search"
      placeholder="Titre de la série…"
      autoComplete="off"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
