// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  // Message affiché sous le champ ; absent quand le champ est valide.
  error?: string
}

// Champ avec son libellé et son message d'erreur. Réutilisé par la recherche, Ma liste et la connexion.
export function TextField({ id, label, error, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className="input"
        aria-invalid={error !== undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        // L'icône et le texte signalent l'erreur sans dépendre de la couleur.
        <p id={errorId} className="field-error">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  )
}
