// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { createContext, useContext } from 'react'
import type { ListEntry } from '../types/list'
import type { Show } from '../types/show'

// Ce que le contexte partage : la liste et les actions qui la modifient.
export interface MyListValue {
  entries: ListEntry[]
  isInList: (showId: number) => boolean
  add: (show: Show) => void
  remove: (showId: number) => void
  setPriority: (showId: number, priority: number) => void
  clear: () => void
}

export const MyListContext = createContext<MyListValue | null>(null)

// Utilisé hors de <MyListProvider>, le hook lève une erreur claire plutôt que de renvoyer null.
export function useMyList(): MyListValue {
  const value = useContext(MyListContext)
  if (value === null) throw new Error('useMyList doit être utilisé sous <MyListProvider>.')
  return value
}
