import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'

// const gridClasses = 'mt-6 grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6'

const emptyClasses = [
  'mt-8 rounded-card border border-dashed border-line',
  'bg-white px-6 py-12 text-center',
].join(' ')

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className={emptyClasses}>
        <p className="font-display text-x1 font-semibold text-ink">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-ink-muted">Змініть запит або очистіть поле пошуку.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string.isRequired,
      inStock: PropTypes.bool,
    }).isRequired
  ),
}

export default ProductList
