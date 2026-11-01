// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ListEntry } from '../types/list'
import type { Show } from '../types/show'
import { createListEntry, isListEntryList } from '../utils/list'
import { readJson, writeJson } from '../utils/storage'
import { MyListContext } from './my-list-context'

const STORAGE_KEY = 'streamflix-my-list'

export function MyListProvider({ children }: { children: ReactNode }) {
  // La liste est relue une seule fois au démarrage, puis sauvegardée à chaque changement.
  const [entries, setEntries] = useState<ListEntry[]>(() =>
    readJson(STORAGE_KEY, isListEntryList, []),
  )

  useEffect(() => writeJson(STORAGE_KEY, entries), [entries])

  // Chaque action renvoie un nouveau tableau : l'état n'est jamais modifié sur place.
  const add = useCallback((show: Show) => {
    setEntries((list) =>
      list.some((entry) => entry.showId === show.id)
        ? list
        : [...list, createListEntry(show, list.length)],
    )
  }, [])

  const remove = useCallback((showId: number) => {
    setEntries((list) => list.filter((entry) => entry.showId !== showId))
  }, [])

  const setPriority = useCallback((showId: number, priority: number) => {
    setEntries((list) =>
      list.map((entry) => (entry.showId === showId ? { ...entry, priority } : entry)),
    )
  }, [])

  const clear = useCallback(() => setEntries([]), [])

  const isInList = useCallback(
    (showId: number) => entries.some((entry) => entry.showId === showId),
    [entries],
  )

  // Valeur mémoïsée : les composants abonnés ne se re-rendent que si la liste change.
  const value = useMemo(
    () => ({ entries, isInList, add, remove, setPriority, clear }),
    [entries, isInList, add, remove, setPriority, clear],
  )

  return <MyListContext value={value}>{children}</MyListContext>
}
