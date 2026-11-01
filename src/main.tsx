// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { AuthProvider } from './context/AuthProvider'
import { MyListProvider } from './context/MyListProvider'
import { queryClient } from './services/queryClient'
import './styles/index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Élément #root introuvable dans index.html.')

// Les fournisseurs sont posés une seule fois : cache des requêtes, session, Ma liste.
createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyListProvider>
          <App />
        </MyListProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
