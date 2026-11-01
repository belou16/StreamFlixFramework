// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Petites fonctions sur le texte et les dates.

// Minuscules et sans accents : « pokemon » trouve « Pokémon ».
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

// formatCount(2, 'série', 'séries') donne « 2 séries ».
export function formatCount(count: number, singular: string, plural: string): string {
  return `${count} ${count > 1 ? plural : singular}`
}

// Date du jour au format AAAA-MM-JJ, en heure locale (toISOString donnerait l'heure UTC).
export function getTodayDate(): string {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${today.getFullYear()}-${month}-${day}`
}
