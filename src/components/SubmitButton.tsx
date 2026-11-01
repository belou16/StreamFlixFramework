// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { ReactNode } from 'react'

interface SubmitButtonProps {
  isPending: boolean
  pendingLabel: string
  disabled?: boolean
  children: ReactNode
}

// Bouton d'envoi d'un formulaire. Réutilisé par la connexion et par l'envoi de la sélection.
export function SubmitButton({
  isPending,
  pendingLabel,
  disabled = false,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={isPending ? 'button button-primary is-loading' : 'button button-primary'}
      disabled={disabled || isPending}
    >
      {isPending ? pendingLabel : children}
    </button>
  )
}
