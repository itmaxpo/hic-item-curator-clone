import React, { useState, useEffect, createContext } from 'react'
import { getAccommCategoriesApi } from 'services/accommCategoriesApi'
import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'

const AccommCategoriesContext = createContext([])

let globalCategories = []

const DEFAULT_LABEL = 'No Category'

export const AccommCategoriesProvider = ({ children }) => {
  const [accommodationCategories, setAccommodationCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
      const res = await getAccommCategoriesApi()
      const categories = sortCategories(transformCategories(res))
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
  const noCategory = {
    fields: [
      {
        content: DEFAULT_LABEL
      }
    ],
    uuid: null
  }
  const categories = [...res?.data, noCategory]
  return categories.map(category => {
    const label = category?.fields[0]?.content
    const value = category?.uuid ? `kiwi://Elephant/Item/${category?.uuid}` : null
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

export function getDefaultCategoryValue() {
  const { value: defaultValue } = globalCategories.find(
    category => category?.label === DEFAULT_LABEL
  ) || { value: null }
  return defaultValue
}

export function getCategoryValue(item) {
  const defaultValue = getDefaultCategoryValue()
  if (!item?.[ACCOMM_CATEGORY_COMPONENT_NAME]) return defaultValue
  return item?.[ACCOMM_CATEGORY_COMPONENT_NAME]
}

export function getCategoryLabel(item) {
  const value = getCategoryValue(item)
  const { label } = globalCategories.find(category => category?.value === value) || { label: '' }
  return label
}
