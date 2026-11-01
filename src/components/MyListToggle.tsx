// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { useState } from 'react'
import { useMyList } from '../context/my-list-context'
import type { Show } from '../types/show'
import { Feedback } from './Feedback'

// Ajoute la série à Ma liste ou l'en retire, avec un message de confirmation.
export function MyListToggle({ show }: { show: Show }) {
  const { isInList, add, remove } = useMyList()
  const [message, setMessage] = useState('')
  const isSaved = isInList(show.id)

  function handleClick() {
    if (isSaved) {
      remove(show.id)
      setMessage('Série retirée de votre liste.')
    } else {
      add(show)
      setMessage('Série ajoutée à votre liste.')
    }
  }

  return (
    <>
      <button
        type="button"
        className={`button button-block ${isSaved ? 'button-secondary' : 'button-primary'}`}
        onClick={handleClick}
      >
        {isSaved ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
      </button>
      <Feedback status="success" message={message} />
    </>
  )
}
