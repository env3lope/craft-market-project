import CatalogPage from './pages/CatalogPage'
import { useCart } from './hooks/useCart.js'
import CartPage from './components/CartPage/CartPage.jsx'
import PromocodeForm from './components/PromocodeForm/PromocodeForm.jsx'
import './App.css'

function App() {
  const cart = useCart()

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__logo">CraftMarket</p>
        <p className="app__cart-counter" aria-live="polite">
          У кошику: {cart.totalCount}
        </p>
      </header>
      <main className="app__layout">
        <aside className="app__cart" aria-label="Кошик покупок">
          <CartPage cart={cart} />
          <PromocodeForm applyPromo={cart.applyPromo} />
        </aside>
        <CatalogPage onAddToCart={cart.addItem} />
      </main>
    </div>
  )
}

export default App
