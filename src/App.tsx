// IA : Claude Code, modèle Claude Opus 5.5 (Anthropic), 15/10/2026. Voir README, « Utilisation de l'IA générative ».
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { Catalog } from './pages/Catalog'
import { Login } from './pages/Login'
import { MyList } from './pages/MyList'
import { NotFound } from './pages/NotFound'
import { ShowDetail } from './pages/ShowDetail'

// Routes créées une seule fois, hors des composants. Layout affiche l'en-tête autour de chaque page.
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Catalog /> },
      { path: 'serie/:id', element: <ShowDetail /> },
      {
        path: 'liste',
        element: (
          <RequireAuth>
            <MyList />
          </RequireAuth>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
