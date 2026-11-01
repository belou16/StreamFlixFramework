// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
interface FeedbackProps {
  // Mêmes valeurs que le statut d'une mutation TanStack Query.
  status: 'idle' | 'pending' | 'success' | 'error'
  message: string
}

// Zone toujours présente dans la page, même vide : les lecteurs d'écran annoncent chaque message.
export function Feedback({ status, message }: FeedbackProps) {
  return (
    <p className="feedback" data-status={status} aria-live="polite">
      {message}
    </p>
  )
}
