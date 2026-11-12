import CatalogPage from './pages/CatalogPage'
import Header from './components/Header/Header'
import CartPage from './components/CartPage/CartPage'
import { useState } from 'react'
import BreakpointBadge from './components/dev/BreakpointBadge'
import DesignSystemPreview from './pages/DesignSystemPreview'

const container = 'mx-auto max-w-6x1 px-4'

export default function App() {
  const [page, setPage] = useState('catalog')

  return (
    <div className="min-h-screen">
      {import.meta.env.DEV && <BreakpointBadge />}
      <Header onNavigate={setPage} />

      <main className={`${container} py-8`}>
        {page === 'catalog' ? <CatalogPage /> : <CartPage />}
      </main>
    </div>

    // <DesignSystemPreview />
  )
}
