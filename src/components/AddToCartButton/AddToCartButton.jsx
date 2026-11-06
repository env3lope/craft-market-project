import PropTypes from 'prop-types'
import { useCartContext } from '../../context/useCartContext'

const classes = [
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5',
  'text-sm font-semibold text-white',
  'bg-clay-600 enabled:hover:bg-clay-700 enabled:active:bg-clay-700',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-clay-700',
  'disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted',
  'transition-colors duration-200 ease-soft motion-reduce:transition-none',
].join(' ')

function AddToCartButton({ product }) {
  const { items, addItem } = useCartContext()

  const inCart = items.find((item) => item.id === product.id)

  if (!product.inStock) {
    return (
      <button type="button" className={classes} disabled>
        Немає в наявності
      </button>
    )
  }

  return (
    <button type="button" className={classes} onClick={() => addItem(product)}>
      {inCart ? `У кошику (${inCart.quantity}) - додати ще` : 'Додати в кошик'}
    </button>
  )
}

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AddToCartButton
