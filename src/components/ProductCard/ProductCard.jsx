import PropTypes from 'prop-types'
import './ProductCard.css'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 */

const PLACEHOLDER_IMAGE = '/assets/product-placeholder.png'

function ProductCard({ title, price, image, category, inStock = true, onAddToCart }) {
  const imageSrc = image || PLACEHOLDER_IMAGE
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={imageSrc}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = PLACEHOLDER_IMAGE
        }}
        alt={title}
      />
      <h3>{title}</h3>
      <p className="product-card__price">{price} грн</p>
      <p className="product-card__category">{category}</p>
      {!inStock && (
        <span className="product-card__badge product-card__badge--out">Немає в наявності</span>
      )}
      {inStock && category === 'Кераміка' ? (
        <span className="product-card__badge product-card__badge--sale">Розпродаж</span>
      ) : (
        ''
      )}
      <button type="button" className="product-card__add" disabled={!inStock} onClick={onAddToCart}>
        {inStock ? 'До кошика' : 'Немає в наявності'}
      </button>
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductCard
