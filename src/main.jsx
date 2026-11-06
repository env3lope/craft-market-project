import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartProvider.jsx'
import App from './App.jsx'
import './index.css'

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import('./mocks/browser.js')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>
  )
})
