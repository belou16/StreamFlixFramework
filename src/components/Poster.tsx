// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useState } from 'react'
import placeholderUrl from '../assets/poster-placeholder.svg'

// Taille des affiches TVMaze : la place est réservée avant le chargement, la page ne saute pas.
const POSTER_WIDTH = 210
const POSTER_HEIGHT = 295

interface PosterProps {
  src: string | null
  title: string
  // 'eager' pour les affiches visibles dès l'ouverture de la page : téléchargées en priorité.
  loading?: 'lazy' | 'eager'
}

// Affiche d'une série, avec une image de secours. Réutilisée par la carte, la fiche et Ma liste.
export function Poster({ src, title, loading = 'lazy' }: PosterProps) {
  // On retient l'adresse en échec plutôt qu'un booléen : une nouvelle affiche repart sans erreur.
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const imageUrl = src !== null && src !== failedSrc ? src : null

  return (
    <img
      className="poster"
      src={imageUrl ?? placeholderUrl}
      alt={imageUrl ? `Affiche de ${title}` : 'Affiche indisponible'}
      width={POSTER_WIDTH}
      height={POSTER_HEIGHT}
      loading={loading}
      decoding="async"
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      onError={() => setFailedSrc(src)}
    />
  )
}
