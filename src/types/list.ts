// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».

// Série retenue dans Ma liste. Titre, année et affiche sont copiés au moment de l'ajout :
// la page Ma liste s'affiche ainsi sans rappeler l'API.
export interface ListEntry {
  showId: number
  name: string
  year: number | null
  posterUrl: string | null
  priority: number // entier de 1 (à voir en premier) à 10
}

// Charge utile attendue par POST /posts.
export interface SelectionPayload {
  userId: number
  date: string // AAAA-MM-JJ
  shows: { showId: number; priority: number }[]
}

// Le service de recette renvoie la charge utile, augmentée d'un identifiant.
export interface SelectionResponse extends SelectionPayload {
  id: number
}
