// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { Link, useLocation } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { paths } from '../paths'
import './NotFound.css'

export function NotFound() {
  const { pathname } = useLocation()

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <PageMeta
        title="Page introuvable"
        description="Cette page n'existe pas ou a été déplacée."
        noIndex
      />
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1 id="not-found-title" className="page-title">
        Page introuvable
      </h1>
      <p className="not-found-message">
        L'adresse <code>{pathname}</code> ne correspond à aucune page. Elle a peut-être été
        déplacée, ou contient une faute de frappe.
      </p>
      <div className="not-found-actions">
        <Link className="button button-primary" to={paths.catalog}>
          Retour au catalogue
        </Link>
        <Link className="button button-secondary" to={paths.myList}>
          Voir ma liste
        </Link>
      </div>
    </section>
  )
}
