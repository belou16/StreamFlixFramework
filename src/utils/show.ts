// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Lecture et mise en forme d'une série : aucune valeur null n'arrive jusqu'à l'écran.
import type { Show } from '../types/show'

const STAR_COUNT = 5

const STATUS_LABELS: Record<string, string> = {
  Running: 'En cours',
  Ended: 'Terminée',
  'To Be Determined': 'À déterminer',
  'In Development': 'En développement',
}

// Identifiant lu dans l'URL : un entier positif, sinon null (et aucun appel à l'API).
export function parseShowId(param: string | undefined): number | null {
  if (!param || !/^[1-9]\d*$/.test(param)) return null

  const showId = Number(param)
  return Number.isSafeInteger(showId) ? showId : null
}

export function getRating(show: Show): number | null {
  return show.rating.average
}

export function getYear(show: Show): number | null {
  return show.premiered ? Number(show.premiered.slice(0, 4)) : null
}

export function formatYear(year: number | null): string {
  return year === null ? 'Année inconnue' : String(year)
}

// Une série télé a une chaîne, une série en streaming a une plateforme.
export function formatChannel(show: Show): string {
  return show.network?.name ?? show.webChannel?.name ?? 'Chaîne inconnue'
}

export function formatStatus(status: string): string {
  return STATUS_LABELS[status] ?? status
}

// 6.6 devient « 6,6 ».
export function formatRating(rating: number): string {
  return rating.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

// Note sur 10 convertie en 5 étoiles : 6.6 devient « ★★★☆☆ ».
export function formatStars(rating: number): string {
  const filledStars = Math.round(rating / 2)
  return '★'.repeat(filledStars) + '☆'.repeat(STAR_COUNT - filledStars)
}

// Le résumé de l'API est du HTML. On n'en garde que le texte, paragraphe par paragraphe :
// rien ne passe par dangerouslySetInnerHTML, donc aucun script ne peut être injecté.
export function summaryToParagraphs(summary: string | null): string[] {
  if (!summary) return []

  const html = new DOMParser().parseFromString(summary, 'text/html')
  const paragraphs = [...html.querySelectorAll('p')].map((paragraph) => paragraph.textContent)
  const texts = paragraphs.length > 0 ? paragraphs : [html.body.textContent]

  // Sans paragraphe vide ni doublon : chaque texte est unique et peut servir de clé React.
  return [...new Set(texts.map((text) => text.trim()).filter(Boolean))]
}

// Description de la fiche pour les moteurs de recherche.
export function describeShow(show: Show): string {
  return `${show.name} (${formatYear(getYear(show))}, ${formatChannel(show)}) : note, genres, statut et résumé de la série sur StreamFlix.`
}
