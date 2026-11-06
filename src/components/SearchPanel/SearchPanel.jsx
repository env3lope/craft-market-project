import PropTypes from 'prop-types'

const panelClasses = [
  'mt-6 rounded-card border border-line bg-white p-4 shadow-card',
  'sm:flex sm:items-center sm:justify-between sm:gap-6',
].join(' ')

const inputClasses = [
  'w-full rounded-lg border border-edge bg-paper px-4 py-2.5 text-ink',
  'placeholder:text-ink-muted',
  'focus:border-clay-600 focus:outline-2 focus:outline-offset-0',
  'focus:outline-clay-600/40',
].join(' ')

function SearchPanel({ searchQueryValue, onSearchChange, onSortChange, total }) {
  return (
    <form rold="search" className={panelClasses} onSubmit={(event) => event.preventDefault()}>
      <div className="flex-1">
        <label htmlFor="catalog-search" className="sr-only">
          Пошук за назвою товару
        </label>
        <input
          id="catalog-search"
          type="search"
          value={searchQueryValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Наприклад, ваза"
          className={inputClasses}
        />
      </div>
      <p role="status" className="mt-3 text-sm text-ink-muted sm:mt-0">
        Знайдено: <span className="font-semibold text-ink">{total}</span>
      </p>
      <select
        className="text-ink text-md font-semibold"
        defaultValue=""
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="">Оберіть метод сортування...</option>
        <option value="sort-name-asc">Сортування за назвою (A-Я)</option>
        <option value="sort-name-desc">Сортування за назвою (Я-А)</option>
        <option value="sort-price-asc">Сортування за ціною (зрос.)</option>
        <option value="sort-price-desc">Сортування за ціною (спад.)</option>
      </select>
    </form>
  )
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
}

export default SearchPanel
