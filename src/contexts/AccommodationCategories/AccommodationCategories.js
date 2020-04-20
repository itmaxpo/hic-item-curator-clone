import React, { useState, useEffect, createContext } from 'react'
import { getAccommCategoriesApi } from 'services/accommCategoriesApi'
import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

const AccommCategoriesContext = createContext([])

let globalCategories = []

export const AccommCategoriesProvider = ({ children }) => {
  const [accommodationCategories, setAccommodationCategories] = useState([])
  useEffect(() => {
    async function getCategories() {
      const res = await getAccommCategoriesApi()
      const categories = transformCategories(res)
      setAccommodationCategories(categories)
      globalCategories = categories
    }
    getCategories()
  }, [])

  return (
    <AccommCategoriesContext.Provider value={accommodationCategories}>
      {children}
    </AccommCategoriesContext.Provider>
  )
}
export default AccommCategoriesContext

function transformCategories(res) {
  return res?.data.map(category => {
    const label = category?.fields[0]?.content
    const value = category?.uuid
    return { value, label }
  })
}

/**
 * Other Helper methods
 */

function getCategoryValue(item) {
  if (!item[ACCOMM_CATEGORY_COMPONENT_NAME]) return null
  const values = item[ACCOMM_CATEGORY_COMPONENT_NAME].split('/')
  return values[values.length - 1]
}

export function getCategoryLabel(item) {
  const value = getCategoryValue(item)
  const [category] = globalCategories.filter(category => {
    if (category.value === value) return category.label
  })
  return category ? category.label : ''
}

export function getDefaultCategoryValue(item) {
  const value = getCategoryValue(item)
  const [{ value: defaultValue }] = globalCategories.filter(
    category => category.label === 'No Category'
  )
  return value || defaultValue
}
