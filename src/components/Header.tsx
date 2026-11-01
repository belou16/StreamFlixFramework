// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { useMyList } from '../context/my-list-context'
import { paths } from '../paths'
import type { LoginRedirectState } from '../utils/auth'
import './Header.css'

export function Header() {
  const { entries } = useMyList()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => setIsMenuOpen(false)

  // Échap ferme le menu mobile et rend le focus au bouton qui l'a ouvert.
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu()
      menuButtonRef.current?.focus()
    }
  }

  function handleLogout() {
    logout()
    closeMenu()
    navigate(paths.catalog)
  }

  // Après la connexion, on revient sur la page où l'on se trouvait.
  const loginState: LoginRedirectState = { from: location.pathname }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <div className="container header-inner">
        <Link className="logo" to={paths.catalog} onClick={closeMenu}>
          Stream<span className="logo-accent">Flix</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="visually-hidden">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true" />
        </button>

        <nav id="main-nav" className="main-nav" aria-label="Navigation principale">
          <ul className="nav-list">
            <li>
              <NavLink className="nav-link" to={paths.catalog} end onClick={closeMenu}>
                Catalogue
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={paths.myList} onClick={closeMenu}>
                Ma liste
                <span className="visually-hidden">, séries retenues :</span>
                <span className="nav-count">{entries.length}</span>
              </NavLink>
            </li>
            <li>
              {user ? (
                <button type="button" className="nav-link nav-button" onClick={handleLogout}>
                  Se déconnecter
                  <span className="nav-user">({user.username})</span>
                </button>
              ) : (
                <NavLink
                  className="nav-link"
                  to={paths.login}
                  state={loginState}
                  onClick={closeMenu}
                >
                  Se connecter
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
