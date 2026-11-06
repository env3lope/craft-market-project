import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './CartContext'
import { useCart } from '../hooks/useCart'

export function CartProvider({ children }) {
  const {
    items,
    totalCount,
    subtotal,
    totalPrice,
    promoCode,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
  } = useCart()

  const value = useMemo(
    () => ({
      items,
      totalCount,
      subtotal,
      totalPrice,
      promoCode,
      isEmpty,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyPromo,
    }),
    [
      items,
      totalCount,
      subtotal,
      totalPrice,
      promoCode,
      isEmpty,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyPromo,
    ]
  )

  return <CartContext value={value}>{children}</CartContext>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
