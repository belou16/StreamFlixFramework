// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { createContext, useContext } from 'react'
import type { Credentials, User } from '../types/user'

// Ce que le contexte partage : l'utilisateur connecté, son jeton et les actions de connexion.
export interface AuthValue {
  user: User | null
  token: string | null
  // Rejette une ApiError si le service refuse les identifiants.
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthValue | null>(null)

// Utilisé hors de <AuthProvider>, le hook lève une erreur claire plutôt que de renvoyer null.
export function useAuth(): AuthValue {
  const value = useContext(AuthContext)
  if (value === null) throw new Error('useAuth doit être utilisé sous <AuthProvider>.')
  return value
}
