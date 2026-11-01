// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useMutation } from '@tanstack/react-query'
import type { SubmitEvent } from 'react'
import { useAuth } from '../context/auth-context'
import { useMyList } from '../context/my-list-context'
import { useSelectionForm } from '../hooks/useSelectionForm'
import { sendSelection } from '../services/api'
import { getErrorMessage } from '../utils/errors'
import { buildSelectionPayload } from '../utils/list'
import { getTodayDate } from '../utils/text'
import { Feedback } from './Feedback'
import { ListEntries } from './ListEntries'
import { SubmitButton } from './SubmitButton'
import { TextField } from './TextField'
import './SelectionForm.css'

// Formulaire d'envoi de Ma liste : priorités, nom de la sélection et adresse e-mail.
export function SelectionForm() {
  const { user } = useAuth()
  const { entries, remove, clear } = useMyList()
  const form = useSelectionForm()
  const selection = useMutation({ mutationFn: sendSelection })

  // Message affiché pour chaque étape de l'envoi.
  const statusMessages = {
    idle: '',
    pending: 'Envoi de votre sélection…',
    success: `Sélection « ${form.name.trim()} » envoyée (n° ${selection.data?.id}).`,
    error: `L'envoi a échoué. ${getErrorMessage(selection.error)}`,
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    // La page est protégée : user ne vaut null que si la session vient d'être fermée.
    if (!form.isValid || user === null) return

    // Le nom et l'e-mail restent côté client : la charge utile attendue ne les contient pas.
    selection.mutate(buildSelectionPayload(user.id, entries, getTodayDate()))
  }

  return (
    <form className="selection-form" noValidate onSubmit={handleSubmit}>
      <ListEntries
        entries={entries}
        invalidPriorities={form.invalidPriorities}
        emptyError={form.showsError}
        onPriorityChange={form.changePriority}
        onRemove={remove}
        onClear={clear}
      />

      <fieldset className="form-section">
        <legend className="section-title">Votre sélection</legend>
        <TextField
          id="selection-name"
          label="Nom de la sélection"
          autoComplete="off"
          value={form.name}
          error={form.nameError}
          onChange={(event) => form.setName(event.target.value)}
          onBlur={() => form.touchField('name')}
        />
        <TextField
          id="selection-email"
          label="Adresse e-mail"
          type="email"
          autoComplete="email"
          value={form.email}
          error={form.emailError}
          onChange={(event) => form.setEmail(event.target.value)}
          onBlur={() => form.touchField('email')}
        />
      </fieldset>

      <div className="form-actions">
        <SubmitButton
          isPending={selection.isPending}
          pendingLabel="Envoi en cours…"
          disabled={!form.isValid}
        >
          Envoyer ma sélection
        </SubmitButton>
        {!form.isValid && (
          <p className="form-hint">
            Le bouton s'active une fois tous les champs correctement remplis.
          </p>
        )}
        <Feedback status={selection.status} message={statusMessages[selection.status]} />
      </div>
    </form>
  )
}
