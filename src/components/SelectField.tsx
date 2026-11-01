// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { ChangeEvent } from 'react'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectFieldProps<T extends string> {
  id: string
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
}

// Liste déroulante avec son libellé. Réutilisée par le filtre de genre et par le tri.
export function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    // On retrouve l'option choisie : la valeur garde son type T, sans conversion forcée.
    const selected = options.find((option) => option.value === event.target.value)
    if (selected) onChange(selected.value)
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select id={id} className="select" value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
