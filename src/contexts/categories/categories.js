import React, { useState, useEffect, createContext } from 'react'
import { getCategoriesApi } from 'services/categoriesApi'
import { CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

const CategoriesContext = createContext([])

let globalCategories = []

const DEFAULT_LABEL = 'No Category'

export const CategoriesProvider = ({ children }) => {
  const [accommodationCategories, setAccommodationCategories] = useState([])
  useEffect(() => {
    async function getCategories() {
      const res = await getCategoriesApi()
      const categories = sortCategories(transformCategories(res))
      setAccommodationCategories(categories)
      globalCategories = categories
    }
    getCategories()
  }, [])

  return (
    <CategoriesContext.Provider value={accommodationCategories}>
      {children}
    </CategoriesContext.Provider>
  )
}
export default CategoriesContext

function transformCategories(res) {
  return res?.data.map(category => {
    const label = category?.fields[0]?.content
    const value = category?.uuid
    return { value, label }
  })
}

// ensure the sorting follows this order
function sortCategories(categories) {
  const orderedCategories = [
    'No Category',
    'Eco-Budget',
    'Budget',
    'Standard',
    'Luxury',
    'High-End'
  ]
  return orderedCategories.map(categoryLabel => {
    return categories.find(categoryObj => categoryObj.label === categoryLabel)
  })
}

/**
 * Other Helper methods
 */

function getCategoryValue(item) {
  if (!item[CATEGORY_COMPONENT_NAME]) return null
  const values = item[CATEGORY_COMPONENT_NAME].split('/')
  return values[values.length - 1]
}

export function getCategoryLabel(item) {
  const value = getCategoryValue(item)
  const [category] = globalCategories.filter(category => {
    if (category.value === value) return category.label
    return null
  })
  return category ? category.label : DEFAULT_LABEL
}

export function getDefaultCategoryValue(item) {
  const value = getCategoryValue(item)
  const [{ value: defaultValue }] = globalCategories.filter(
    category => category.label === DEFAULT_LABEL
  )
  return value || defaultValue
}
