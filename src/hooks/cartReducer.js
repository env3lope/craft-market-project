
/**
 * Позиція кошика CraftMarket
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string} [image]
 * @property {number} quantity
 */

/**
 * Стан кошика
 * @typedef {Object} CartState
 * @property {CartItem[]} items
 * @property {string | null} promoCode
 */

export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  APPLY_PROMO: 'cart/applyPromo',
  CLEAR: 'cart/clear',
})

/** @type {CartState} */
export const initialCartState = Object.freeze({
  items: [],
  promoCode: null,
})

/**
 * @param {CartState} state
 * @param {{type: string, payload?: any}} action
 * @returns {CartState}
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload

      const exists = state.items.some((item) => item.id === product.id)

      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }

      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      }

      return {
        ...state,
        items: [...state.items, newItem],
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.id
        ),
      }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      }
    }

    case CART_ACTIONS.APPLY_PROMO:
      return {
        ...state,
        promoCode: action.payload.promoCode,
      }

    case CART_ACTIONS.CLEAR:
      return initialCartState

    default:
      throw new Error(`Невідома дія кошика: ${action.type}`)
  }
}
