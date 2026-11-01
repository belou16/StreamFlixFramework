// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { ReactNode } from 'react'

interface StatePanelProps {
  variant: 'empty' | 'error' | 'not-found'
  title: string
  message?: string
  // 1 quand le panneau remplace toute la page (fiche introuvable), sinon 2.
  headingLevel?: 1 | 2
  // Actions proposées : bouton Réessayer, lien vers le catalogue…
  children?: ReactNode
}

// Encadré commun aux états vide, erreur et introuvable.
export function StatePanel({
  variant,
  title,
  message,
  headingLevel = 2,
  children,
}: StatePanelProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <div className={`state state-${variant}`} role={variant === 'error' ? 'alert' : undefined}>
      <span className="state-icon" aria-hidden="true" />
      <Heading className="state-title">{title}</Heading>
      {message && <p className="state-message">{message}</p>}
      {children}
    </div>
  )
}
