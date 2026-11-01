// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { Link } from 'react-router-dom'
import { paths } from '../paths'
import type { Show } from '../types/show'
import { formatYear, getRating, getYear } from '../utils/show'
import { GenreTags } from './GenreTags'
import { Poster } from './Poster'
import { Rating } from './Rating'
import './ShowCard.css'

interface ShowCardProps {
  show: Show
  posterLoading?: 'lazy' | 'eager'
}

export function ShowCard({ show, posterLoading }: ShowCardProps) {
  return (
    <article className="show-card">
      <Poster src={show.image?.medium ?? null} title={show.name} loading={posterLoading} />

      <div className="show-card-body">
        <h2 className="show-card-title">
          {/* Le lien du titre s'étend à toute la carte (voir ShowCard.css). */}
          <Link className="show-card-link" to={paths.show(show.id)}>
            {show.name}
          </Link>
        </h2>
        <GenreTags genres={show.genres} />
        <p className="show-card-meta">
          <span>{formatYear(getYear(show))}</span>
          <Rating value={getRating(show)} />
        </p>
      </div>
    </article>
  )
}
