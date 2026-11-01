// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
export function GenreTags({ genres }: { genres: string[] }) {
  if (genres.length === 0) return <p className="text-muted">Genre non renseigné</p>

  return (
    // Genres fournis en anglais par l'API : lang="en" pour une bonne prononciation par les lecteurs d'écran.
    <ul className="tag-list" aria-label="Genres" lang="en">
      {genres.map((genre) => (
        <li key={genre} className="tag">
          {genre}
        </li>
      ))}
    </ul>
  )
}
