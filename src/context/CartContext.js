import { createContext } from 'react';

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string} image
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextValue
 * @property {CartItem[]} items
 * @property {number} totalCount
 * @property {number} totalPrice
 * @property {(product: Omit<CartItem, 'quantity'>) => void} addItem
 * @property {(id: string, quantity: number) => void} updateQuantity
 * @property {(id: string) => void} removeItem
 * @property {() => void} clearCart
 */

/** @type {import('react').Context<CartContextValue | null>} */
export const CartContext = createContext(null);

CartContext.displayName = 'CartContext'