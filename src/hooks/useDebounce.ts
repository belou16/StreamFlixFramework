// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useEffect, useState } from 'react'

// Renvoie la valeur une fois qu'elle n'a plus changé pendant `delay` millisecondes.
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // Nouvelle frappe avant la fin du délai : l'ancien minuteur est annulé.
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
