import PropTypes from 'prop-types'
import './search-panel.css'

function SearchPanel({ value, onChange }) {
  function handleInputChange(event) {
    onChange(event.target.value)
  }

  return (
    <div className="search-panel">
      <label htmlFor="catalog-search" className="search-panel__label"></label>
      <input
        id="catalog-search"
        type="text"
        className="search-panel__input"
        placeholder="Введіть назву товару..."
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchPanel
