// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { login as loginRequest } from '../services/api'
import type { AuthSession, Credentials } from '../types/user'
import { isAuthSession } from '../utils/auth'
import { readJson, writeJson } from '../utils/storage'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'streamflix-session'

export function AuthProvider({ children }: { children: ReactNode }) {
  // Session gardée dans localStorage : on reste connecté après un rechargement, comme Ma liste
  // reste remplie. Acceptable pour un jeton de recette ; en production, un cookie httpOnly,
  // illisible par un script injecté, serait plus sûr.
  const [session, setSession] = useState<AuthSession | null>(() =>
    readJson(STORAGE_KEY, isAuthSession, null),
  )

  useEffect(() => writeJson(STORAGE_KEY, session), [session])

  const login = useCallback(async (credentials: Credentials) => {
    const { id, username, firstName, accessToken } = await loginRequest(credentials)
    setSession({ user: { id, username, firstName }, accessToken })
  }, [])

  const logout = useCallback(() => setSession(null), [])

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.accessToken ?? null,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
