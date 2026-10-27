const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

/**@param {number} value*/
export function formatPrice(value) {
  return priceFormatter.format(value)
}