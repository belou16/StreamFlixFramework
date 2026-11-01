// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useCallback, useState } from 'react'
import { useMyList } from '../context/my-list-context'
import { isValidPriority, validateSelection } from '../utils/validation'

type SelectionField = 'name' | 'email'

// Saisies de priorité invalides, rangées par identifiant de série.
export type InvalidPriorities = Partial<Record<number, string>>

// Champs, erreurs et validité du formulaire d'envoi de la sélection.
export function useSelectionForm() {
  const { entries, setPriority } = useMyList()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false })

  // Ma liste ne garde que des priorités valides. Une saisie invalide (« 12 », champ vide…)
  // est conservée ici, pour rester affichée dans son champ avec son message d'erreur.
  const [invalidPriorities, setInvalidPriorities] = useState<InvalidPriorities>({})

  const changePriority = useCallback(
    (showId: number, value: string) => {
      const isValid = isValidPriority(value)
      if (isValid) setPriority(showId, Number(value))

      setInvalidPriorities((current) => {
        const next = { ...current }
        if (isValid) delete next[showId]
        else next[showId] = value
        return next
      })
    },
    [setPriority],
  )

  const errors = validateSelection(name, email, entries.length)
  const hasInvalidPriority = entries.some((entry) => invalidPriorities[entry.showId] !== undefined)
  const isValid = Object.keys(errors).length === 0 && !hasInvalidPriority

  return {
    name,
    setName,
    email,
    setEmail,
    // Une erreur ne s'affiche qu'une fois le champ quitté, pas pendant la première saisie.
    touchField: (field: SelectionField) => setTouched((current) => ({ ...current, [field]: true })),
    nameError: touched.name ? errors.name : undefined,
    emailError: touched.email ? errors.email : undefined,
    showsError: errors.shows,
    invalidPriorities,
    changePriority,
    isValid,
  }
}
