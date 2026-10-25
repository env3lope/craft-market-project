import PropTypes from 'prop-types'
import './ProductCard.css'

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 */

const PLACEHOLDER_IMAGE = '/public/assets/product-placeholder.png'

function ProductCard({ name, price, image, category, inStock = true }) {
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
        alt={name}
      />
      <h3>{name}</h3>
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
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
}

export default ProductCard
