// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Seul fichier qui lit le .env : les adresses des API sont définies à un seul endroit.

function readEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}. Vérifiez le fichier .env.`)
  }
  return value
}

export const config = {
  catalogApiUrl: readEnv('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
  selectionApiUrl: readEnv('VITE_SELECTION_API_URL', import.meta.env.VITE_SELECTION_API_URL),
  authApiUrl: readEnv('VITE_AUTH_API_URL', import.meta.env.VITE_AUTH_API_URL),
}
