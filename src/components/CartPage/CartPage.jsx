import { formatPrice } from '../../utils/formatPrice'
import { useCartContext } from '../../context/useCartContext'
import PromoCodeForm from '../../components/PromoCodeForm/PromoCodeForm'
import './CartPage.css'

export default function CartPage() {
  const {
    items,
    totalCount,
    totalPrice,
    promoCode,
    isEmpty,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
  } = useCartContext()

  if (isEmpty) {
    return (
      <section className="cart" aria-labelledby="cart-title">
        <h2 id="cart-title" className="cart__title">
          Кошик
        </h2>

        <p className="cart__empty">У кошику поки немає товарів. Оберіть щось у каталозі.</p>
      </section>
    )
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <h1 id="cart-title">Кошик</h1>
      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img className="cart-item__image" src={item.image} alt="" />
            <span className="cart-item__title">{item.title}</span>
            <div className="cart-item__qty">
              <button
                type="button"
                aria-label={`Зменшити кількість: ${item.title}`}
                disabled={item.quantity === 1}
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <output aria-live="polite">{item.quantity}</output>
              <button
                type="button"
                aria-label={`Збільшити кількість: ${item.title}`}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <span className="cart-item__sum">{formatPrice(item.price * item.quantity)}</span>
            <button type="button" onClick={() => removeItem(item.id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
      <div className="cart__promo">
        <PromoCodeForm applyPromo={applyPromo} />
        {promoCode && (
          <p className="cart__promo-success">Промокод {promoCode} застосовано. Знижка 10%.</p>
        )}
      </div>
      <p className="cart__total">
        Товарів: {totalCount}. Разом: <strong>{formatPrice(totalPrice)}</strong>
      </p>
      <button type="button" className="btn btn--secondary" onClick={clearCart}>
        Очистити кошик
      </button>
    </section>
  )
}
