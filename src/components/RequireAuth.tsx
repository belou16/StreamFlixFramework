// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { paths } from '../paths'
import type { LoginRedirectState } from '../utils/auth'

// Page réservée aux utilisateurs connectés : les autres passent par /login, puis reviennent ici.
// Cette garde guide l'utilisateur ; c'est l'API qui protège réellement les données.
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const state: LoginRedirectState = { from: location.pathname }
    // replace : le bouton Retour ne ramène pas sur la page refusée.
    return <Navigate to={paths.login} replace state={state} />
  }

  return children
}
