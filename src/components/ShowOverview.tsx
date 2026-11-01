// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { Show } from '../types/show'
import {
  formatChannel,
  formatStatus,
  formatYear,
  getRating,
  getYear,
  summaryToParagraphs,
} from '../utils/show'
import { GenreTags } from './GenreTags'
import { MyListToggle } from './MyListToggle'
import { Poster } from './Poster'
import { Rating } from './Rating'
import './ShowOverview.css'

// Contenu complet de la fiche d'une série.
export function ShowOverview({ show }: { show: Show }) {
  const paragraphs = summaryToParagraphs(show.summary)
  const facts = [
    { label: 'Année', value: formatYear(getYear(show)) },
    { label: 'Chaîne', value: formatChannel(show) },
    { label: 'Statut', value: formatStatus(show.status) },
  ]

  return (
    <article className="show-detail">
      <div className="show-detail-poster">
        <Poster src={show.image?.original ?? null} title={show.name} loading="eager" />
      </div>

      <div className="show-detail-header">
        <h1 className="show-detail-title">{show.name}</h1>
        <Rating value={getRating(show)} />
        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label} className="fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <GenreTags genres={show.genres} />
      </div>

      <div className="show-detail-actions">
        <MyListToggle show={show} />
      </div>

      <section className="show-detail-summary" aria-labelledby="summary-title">
        <h2 id="summary-title" className="section-title">
          Résumé
        </h2>
        {paragraphs.length > 0 ? (
          // Résumé fourni en anglais par l'API.
          <div className="summary" lang="en">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        ) : (
          <p className="text-muted">Aucun résumé disponible pour cette série.</p>
        )}
      </section>
    </article>
  )
}
