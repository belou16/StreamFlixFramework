// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
interface PageMetaProps {
  title: string
  description: string
  // Pages privées ou sans contenu utile (connexion, Ma liste, 404) : exclues des moteurs de recherche.
  noIndex?: boolean
}

// Titre et description propres à chaque page. React 19 déplace ces balises dans le <head>.
export function PageMeta({ title, description, noIndex = false }: PageMetaProps) {
  return (
    <>
      <title>{`${title} · StreamFlix`}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}
