// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Règles du formulaire d'envoi : fonctions pures, utilisées par les champs et par le bouton.

export const MIN_PRIORITY = 1
export const MAX_PRIORITY = 10
export const PRIORITY_ERROR = `La priorité doit être un nombre entier entre ${MIN_PRIORITY} et ${MAX_PRIORITY}.`

// Format courant : texte@domaine.extension, sans espace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// value est le texte du champ ; il est vide si le navigateur n'y reconnaît pas un nombre.
export function isValidPriority(value: string): boolean {
  if (value.trim() === '') return false

  const priority = Number(value)
  return Number.isInteger(priority) && priority >= MIN_PRIORITY && priority <= MAX_PRIORITY
}

export interface SelectionErrors {
  name?: string
  email?: string
  shows?: string
}

// Erreurs du formulaire, hors priorités (vérifiées ligne par ligne). Objet vide : tout est valide.
export function validateSelection(name: string, email: string, showCount: number): SelectionErrors {
  const errors: SelectionErrors = {}

  if (name.trim() === '') {
    errors.name = 'Donnez un nom à votre sélection.'
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.'
  }
  if (showCount === 0) {
    errors.shows = 'Ajoutez au moins une série depuis sa fiche pour pouvoir envoyer une sélection.'
  }

  return errors
}
