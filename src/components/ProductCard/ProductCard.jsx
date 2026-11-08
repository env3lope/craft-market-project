import AddToCartButton from '../AddToCartButton/AddToCartButton'
import { buildSrcSet, CARD_IMAGE_SIZES } from '../../utils/images'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 */

const PLACEHOLDER_IMAGE = '/assets/product-placeholder.png'

// const cardClasses = [
//   'group flex w-full flex-col overflow-hidden',
//   'rounded-card border border-line bg-white shadow-card',
//   'transition-shadow duration-300 ease-soft hover:shadow-lift',
// ].join(' ')

// const imageClasses = 'h-full w-full object-cover transition-transform duration-500 ease-soft'

const saleClasses = {
  badge: 'w-fit rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700',
  oldPrice: 'text-sm font-medium text-ink-muted line-through',
}

const newClasses = {
  badge: 'w-fit rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700',
}

const badgeClasses =
  'w-fit rounded-full bg-clay-100 px-2.5 py-0.5 text-xs font-medium text-clay-700'

function ProductCard({ product }) {
  const imageSrc = product.image || PLACEHOLDER_IMAGE
  const inStock = product.inStock !== false

  // const imageState = inStock ? 'group-hover:scale-105' : 'grayscale'
  const tone = inStock ? 'text-ink' : 'text-ink-muted'

  const isOnSale = product.oldPrice > product.price
  const discount = isOnSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="aspect-4/3 w-full bg-stone-100">
        <img
          className="h-full w-full object-cover"
          width="400"
          height="300"
          src={`${imageSrc}?w=480`}
          srcSet={buildSrcSet(imageSrc)}
          sizes={CARD_IMAGE_SIZES}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PLACEHOLDER_IMAGE
          }}
          alt={product.title}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={badgeClasses}>{product.category}</span>

          {isOnSale && <span className={saleClasses.badge}>-{discount}%</span>}

          {product.isNew && <span className={newClasses.badge}>Новинка</span>}

          {!inStock && (
            <span className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              Немає в наявності
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-stone-900 md:text-lg">
          {product.title}
        </h3>
        <div className="mt-auto">
          {isOnSale && (
            <p className={saleClasses.oldPrice}>{product.oldPrice.toLocaleString('uk-UA')} грн</p>
          )}
          <p className={`text-xl font-bold ${tone}`}>
            {product.price.toLocaleString('uk-UA')}{' '}
            <span className="text-sm font-medium text-ink-muted">грн</span>
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  )
}
export default ProductCard
