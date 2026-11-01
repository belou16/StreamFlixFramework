// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».

export interface User {
  id: number
  username: string
  firstName: string
}

export interface Credentials {
  username: string
  password: string
}

// Réponse de POST /auth/login, limitée aux champs utilisés.
export interface LoginResponse extends User {
  accessToken: string
}

// Ce que l'application garde de la connexion.
export interface AuthSession {
  user: User
  accessToken: string
}
