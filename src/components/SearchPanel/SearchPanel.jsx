import PropTypes from 'prop-types'
import './SearchPanel.css'

function SearchPanel({
  searchQueryValue,
  reviewSearchQueryValue,
  onSearchChange,
  onReviewSearchChange,
  onSortChange,
}) {
  function handleInputChange(event) {
    onSearchChange(event.target.value)
  }

  function handleSelectChange(event) {
    onSortChange(event.target.value)
  }

  function handleReviewSearchChange(event) {
    onReviewSearchChange(event.target.value)
  }

  return (
    <div className="search-panel">
      <label htmlFor="catalog-search" className="search-panel__label"></label>
      <input
        id="catalog-search"
        type="text"
        className="search-panel__input"
        placeholder="Введіть назву товару..."
        value={searchQueryValue}
        onChange={handleInputChange}
      />
      <select className="search-panel__sort-method" defaultValue="" onChange={handleSelectChange}>
        <option value="">--- Оберіть метод сортування ---</option>
        <option value="sort-name-asc">Сортування за назвою (A-Я)</option>
        <option value="sort-name-desc">Сортування за назвою (Я-А)</option>
        <option value="sort-price-asc">Сортування за ціною (зрос.)</option>
        <option value="sort-price-desc">Сортування за ціною (спад.)</option>
      </select>
      <input
        type="text"
        id="review-search"
        className="search-panel__review-search-input"
        placeholder="Введіть ключове слово для пошуку відгуку..."
        value={reviewSearchQueryValue}
        onChange={handleReviewSearchChange}
      />
    </div>
  )
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
}

export default SearchPanel
