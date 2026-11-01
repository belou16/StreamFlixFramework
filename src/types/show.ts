// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Série telle que renvoyée par TVMaze. Seuls les champs utilisés sont déclarés.

export interface Channel {
  name: string
}

export interface Show {
  id: number
  name: string
  genres: string[] // peut être vide
  status: string
  premiered: string | null // AAAA-MM-JJ, null pour une série pas encore diffusée
  rating: { average: number | null }
  network: Channel | null // chaîne de télévision, null pour une série en streaming
  webChannel: Channel | null // plateforme de streaming, null pour une série télé
  image: { medium: string; original: string } | null
  summary: string | null // résumé au format HTML
}

// Élément renvoyé par GET /search/shows.
export interface ShowSearchResult {
  score: number
  show: Show
}
