import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList/ProductList.jsx'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import { sortByName, sortByPrice } from '../utils/sortMethods.js'
import './CatalogPage.css'
import PageContainer from '../layout/PageContainer.jsx'

import ReviewForm from '../components/ReviewForm/ReviewForm.jsx'

const errorClasses = [
  'mt-8 rounded-card border border-clay-600',
  'bg-clay-50 px-4 py-3 text-clay-700',
].join(' ')

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMethod, setSortMethod] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviewSearchQuery, setReviewSearchQuery] = useState('')

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
    return (
      <p rolde="status" className="mt-8 text-ink-muted">
        Завантаження каталогу...
      </p>
    )
  }

  if (error) {
    return (
      <p className={errorClasses} role="alert">
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
    <PageContainer>
      <div className="flex flex-col gap-5 py-6 md:gap-6 md:py-10">
        <h1 className="text-2xl font-bold text-ink md:text-3xl">Каталог</h1>
        <SearchPanel
          searchQueryValue={searchQuery}
          reviewSearchQueryValue={reviewSearchQuery}
          onReviewSearchChange={setReviewSearchQuery}
          onSearchChange={setSearchQuery}
          onSortChange={setSortMethod}
          total={sortedProducts.length}
        />
        <ProductList products={sortedProducts} />
        <ReviewForm />
      </div>
    </PageContainer>
  )
}

export default CatalogPage
