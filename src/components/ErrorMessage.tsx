// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { getErrorMessage } from '../utils/errors'
import { StatePanel } from './StatePanel'

interface ErrorMessageProps {
  title: string
  error: unknown
  onRetry: () => void
}

export function ErrorMessage({ title, error, onRetry }: ErrorMessageProps) {
  return (
    <StatePanel variant="error" title={title} message={getErrorMessage(error)}>
      <button type="button" className="button button-secondary" onClick={onRetry}>
        Réessayer
      </button>
    </StatePanel>
  )
}
