// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { formatRating, formatStars } from '../utils/show'

// Note sur 10 en étoiles. Les étoiles sont décoratives : aria-label donne la note en texte.
export function Rating({ value }: { value: number | null }) {
  if (value === null) return <span className="rating rating-missing">Non notée</span>

  const rating = formatRating(value)

  return (
    <span className="rating" role="img" aria-label={`Note : ${rating} sur 10`}>
      <span className="rating-stars">{formatStars(value)}</span>
      <span className="rating-value">{rating} / 10</span>
    </span>
  )
}
