import { useState } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import { mockProducts } from '../data/mock-products.js'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import './catalog-page.css'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '')

  searchQuery
    ? localStorage.setItem('searchQuery', searchQuery)
    : localStorage.removeItem('searchQuery')

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="catalog-page">
      <SearchPanel value={searchQuery} onChange={setSearchQuery}></SearchPanel>
      <p className="catalog-page__results-count">Знайдено товарів: {filteredProducts.length}</p>
      {filteredProducts.length === 0 ? (
        <p className="catalog-page__empty-message">
          За запитом «{searchQuery}» нічого не знайдено. Спробуйте інше формулювання.
        </p>
      ) : (
        <div className="catalog-page__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default CatalogPage
