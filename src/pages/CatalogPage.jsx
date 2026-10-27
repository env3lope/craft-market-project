import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList/ProductList.jsx'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import { sortByName, sortByPrice } from '../utils/sortMethods.js'
import './CatalogPage.css'
// import ReviewForm from '../components/ReviewForm/ReviewForm.jsx'
// import ReviewList from '../components/ReviewList/ReviewList.jsx'
// import { mockReviews } from '../data/mock-reviews.js'

export function CatalogPage({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMethod, setSortMethod] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // const [reviews, setReviews] = useState([])
  const [reviewSearchQuery, setReviewSearchQuery] = useState('')

  // const handleReviewSubmit = (review) => {
  //   setReviews((prev) => [...prev, review])
  // }

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
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      <SearchPanel
        searchQueryValue={searchQuery}
        reviewSearchQueryValue={reviewSearchQuery}
        onSearchChange={setSearchQuery}
        onSortChange={setSortMethod}
        onReviewSearchChange={setReviewSearchQuery}
      />
      <ProductList products={sortedProducts} onAddToCart={onAddToCart} />
      {/* <ReviewForm onReviewSubmit={handleReviewSubmit} /> */}
    </section>
  )
}

export default CatalogPage
