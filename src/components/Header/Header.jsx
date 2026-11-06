import CartBadge from '../CartBadge/CartBadge'

const container = 'mx-auto max-w-6xl px-4'

export default function Header({ onNavigate }) {
  return (
    <header className="border-b border-line bg-white">
      <div className={`${container} flex items-center justify-between py-4`}>
        <button
          type="button"
          className="font-display text-2xl font-bold tracking-tight text-clay-700"
          onClick={() => onNavigate('catalog')}
        >
          CraftMarket
        </button>

        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-ink-muted sm:block">
            Товари ручної роботи від майстрів України
          </p>

          <CartBadge onClick={() => onNavigate('cart')} />
        </div>
      </div>
    </header>
  )
}
