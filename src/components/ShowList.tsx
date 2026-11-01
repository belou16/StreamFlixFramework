// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { memo } from 'react'
import type { Show } from '../types/show'
import { ShowCard } from './ShowCard'
import './ShowList.css'

// Affiches visibles à l'ouverture : chargées tout de suite, les suivantes au défilement.
const EAGER_POSTER_COUNT = 6

// memo : les 240 cartes ne sont pas recalculées à chaque frappe dans la recherche,
// seulement quand la liste filtrée et triée change.
export const ShowList = memo(function ShowList({ shows }: { shows: Show[] }) {
  return (
    <ul className="show-list">
      {shows.map((show, index) => (
        <li key={show.id}>
          <ShowCard show={show} posterLoading={index < EAGER_POSTER_COUNT ? 'eager' : 'lazy'} />
        </li>
      ))}
    </ul>
  )
})
