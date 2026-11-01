// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './Header'

// Gabarit commun : en-tête, page de la route courante, pied de page.
export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>
      <Header />

      <main id="main" className="container page">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © 2026 StreamFlix · Données fournies par <a href="https://www.tvmaze.com">TVMaze</a>
          </p>
        </div>
      </footer>

      {/* Chaque nouvelle page s'ouvre en haut ; le bouton Retour retrouve la position. */}
      <ScrollRestoration />
    </>
  )
}
