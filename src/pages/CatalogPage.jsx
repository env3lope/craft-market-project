import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList/ProductList.jsx'
import SearchPanel from '../components/SearchPanel/SearchPanel'
// import { mockProducts } from '../data/mock-products.js'
import { sortByName, sortByPrice } from '../utils/sortMethods.js'
import './CatalogPage.css'

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMethod, setSortMethod] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error(`Сервер повернув статус ${response.status}`)
        }
        const data = await response.json()
        if (isActive) {
          setProducts(data)
        }
      } catch (err) {
        if (isActive) {
          setError(err.message)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return <p className="loading-state">Завантаження каталогу...</p>
  }

  if (error) {
    return (
      <p className="error-state" role="alert">
        Не вдалося завантажити каталог: {error}
      </p>
    )
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
