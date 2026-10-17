export function sortByName(products, method) {
  if (method !== "sort-name-asc" && method !== "sort-name-desc") {
    throw new Error("Невідомий метод сортування")
  }

  if (method === "sort-name-asc") {
    return products.sort((a, b) => a.name.localeCompare(b.name))
  }

  return products.sort((a, b) => b.name.localeCompare(a.name))
}

export function sortByPrice(products, method) {
  if (method !== "sort-price-asc" && method !== "sort-price-desc") {
    throw new Error("Невідомий метод сортування")
  }

  if (method === "sort-price-asc") {
    return products.sort((a, b) => a.price - b.price)
  }

  return products.sort((a, b) => b.price - a.price)
}