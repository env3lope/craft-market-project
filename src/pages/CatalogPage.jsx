import { useState, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import { mockProducts } from '../data/mock-products.js'
import ProductList from '../components/ProductList/ProductList.jsx'
import { sortByName, sortByPrice } from '../utils/sortMethods.js'
import './CatalogPage.css'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMethod, setSortMethod] = useState('')

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  let sortedProducts = [...filteredProducts]

  switch (sortMethod) {
    case '':
      break
    case 'sort-name-asc':
    case 'sort-name-desc':
      sortByName(sortedProducts, sortMethod)
      break
    case 'sort-price-asc':
    case 'sort-price-desc':
      sortByPrice(sortedProducts, sortMethod)
      break
  }

  return (
    <section>
      <SearchPanel value={searchQuery} onChange={setSearchQuery} onSortChange={setSortMethod} />
      <ProductList products={sortedProducts} />
    </section>
  )
}

export default CatalogPage
