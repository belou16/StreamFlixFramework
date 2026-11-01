// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useMutation } from '@tanstack/react-query'
import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Feedback } from '../components/Feedback'
import { PageMeta } from '../components/PageMeta'
import { StatePanel } from '../components/StatePanel'
import { SubmitButton } from '../components/SubmitButton'
import { TextField } from '../components/TextField'
import { useAuth } from '../context/auth-context'
import { paths } from '../paths'
import { getRedirectPath } from '../utils/auth'
import { getErrorMessage, isInvalidCredentialsError } from '../utils/errors'
import './Login.css'

// Volontairement vague : le message ne dit pas lequel des deux champs est faux.
const INVALID_CREDENTIALS_MESSAGE = 'Identifiant ou mot de passe incorrect.'

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useMutation({ mutationFn: login })

  const isFilled = username.trim() !== '' && password !== ''

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isFilled) return

    loginMutation.mutate(
      { username: username.trim(), password },
      // Retour à la page demandée avant la connexion ; replace : /login quitte l'historique.
      { onSuccess: () => navigate(getRedirectPath(location.state), { replace: true }) },
    )
  }

  const errorMessage = isInvalidCredentialsError(loginMutation.error)
    ? INVALID_CREDENTIALS_MESSAGE
    : getErrorMessage(loginMutation.error)

  return (
    <section className="login" aria-labelledby="login-title">
      <PageMeta
        title="Connexion"
        description="Connectez-vous à StreamFlix pour gérer et envoyer votre liste de séries."
        noIndex
      />
      <h1 id="login-title" className="page-title">
        Connexion
      </h1>

      {user && !loginMutation.isPending ? (
        <StatePanel variant="empty" title={`Vous êtes connecté en tant que ${user.username}.`}>
          <Link className="button button-secondary" to={paths.myList}>
            Voir ma liste
          </Link>
        </StatePanel>
      ) : (
        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <p className="form-hint">
            Compte de démonstration : <strong>emilys</strong> / <strong>emilyspass</strong>
          </p>
          <TextField
            id="username"
            label="Nom d'utilisateur"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <SubmitButton
            isPending={loginMutation.isPending}
            pendingLabel="Connexion…"
            disabled={!isFilled}
          >
            Se connecter
          </SubmitButton>
          <Feedback status="error" message={loginMutation.isError ? errorMessage : ''} />
        </form>
      )}
    </section>
  )
}
