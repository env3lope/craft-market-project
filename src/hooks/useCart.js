import { useCallback, useMemo, useReducer } from 'react'
import {
  initialCartState,
  CART_ACTIONS,
  cartReducer,
} from './cartReducer'

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem = useCallback((product, quantity = 1) => {
    if (!product.inStock) return

    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity },
    })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id },
    })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR })
  }, [])

  const applyPromo = useCallback((promoCode) => {
    if (promoCode !== 'CRAFT10') {
      return false
    }

    dispatch({
      type: CART_ACTIONS.APPLY_PROMO,
      payload: { promoCode },
    })

    return true
  }, [])

  const totals = useMemo(() => {
    let totalCount = 0
    let totalPrice = 0

    for (const item of state.items) {
      totalCount += item.quantity
      totalPrice += item.price * item.quantity
    }

    if (state.promoCode === 'CRAFT10') {
      totalPrice *= 0.9
    }

    return { totalCount, totalPrice }
  }, [state.items, state.promoCode])

  return {
    items: state.items,
    promoCode: state.promoCode,
    totalCount: totals.totalCount,
    totalPrice: totals.totalPrice,
    isEmpty: state.items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
  }
}
