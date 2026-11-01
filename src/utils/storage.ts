// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Lecture et écriture JSON dans localStorage, sans jamais faire planter l'application.

// Renvoie la valeur stockée si elle a la forme attendue, sinon la valeur par défaut.
export function readJson<T>(key: string, isValid: (value: unknown) => value is T, fallback: T): T {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    return isValid(stored) ? stored : fallback
  } catch {
    // JSON illisible, par exemple modifié à la main : on repart de la valeur par défaut.
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Stockage plein ou bloqué (navigation privée) : l'application continue, sans sauvegarde.
  }
}
