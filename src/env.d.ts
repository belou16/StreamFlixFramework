// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
// Variables du .env : une faute de frappe dans leur nom devient une erreur TypeScript.
// Elles restent optionnelles, car rien ne garantit leur présence : config.ts le vérifie.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_SELECTION_API_URL?: string
  readonly VITE_AUTH_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
