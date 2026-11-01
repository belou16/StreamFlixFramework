// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ErrorMessage } from './ErrorMessage'
import { Loader } from './Loader'

interface AsyncContentProps<T> {
  query: UseQueryResult<T>
  loadingLabel: string
  errorTitle: string
  // Ce qui s'affiche une fois les données reçues.
  children: (data: T) => ReactNode
}

// Chargement et erreur d'une requête, écrits une seule fois pour le catalogue et la fiche.
export function AsyncContent<T>({
  query,
  loadingLabel,
  errorTitle,
  children,
}: AsyncContentProps<T>) {
  if (query.isPending) return <Loader label={loadingLabel} />

  if (query.isError) {
    return <ErrorMessage title={errorTitle} error={query.error} onRetry={() => query.refetch()} />
  }

  return children(query.data)
}
