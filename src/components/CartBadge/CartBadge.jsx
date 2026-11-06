import PropTypes from 'prop-types'
import { ShoppingCart } from 'lucide-react'
import { useCartContext } from '../../context/useCartContext'

export default function CartBadge({ onClick }) {
  const { totalCount } = useCartContext()
  const label = totalCount === 0 ? 'Кошик порожній' : `Кошик, товарів ${totalCount}`

  return (
    <button type="button" className="cart-badge" onClick={onClick} aria-label={label}>
      <ShoppingCart className="cart_badge__icon" aria-hidden="true" />
      {totalCount > 0 && (
        <span className="cart-badge__icon" aria-hidden="true">
          {totalCount > 99 ? '99+' : totalCount}
        </span>
      )}
    </button>
  )
}

CartBadge.propTypes = {
  onClick: PropTypes.func.isRequired,
}
