import CatalogPage from './pages/CatalogPage'
import Header from './components/Header/Header'
import CartPage from './components/CartPage/CartPage'
import { useState } from 'react'

const container = 'mx-auto max-w-6x1 px-4'

export default function App() {
  const [page, setPage] = useState('catalog')

  return (
    <div className="min-h-screen">
      <Header onNavigate={setPage} />

      <main className={`${container} py-8`}>
        {page === 'catalog' ? <CatalogPage /> : <CartPage />}
      </main>
    </div>
  )
}
