import React, { useState, useEffect, createContext } from 'react'
import { getAccommCategoriesApi } from 'services/accommCategoriesApi'
const AccommCategoriesContext = createContext([])

export const AccommCategoriesProvider = ({ children }) => {
  const [accommodationCategories, setAccommodationCategories] = useState([])
  useEffect(() => {
    async function getCategories() {
      const res = await getAccommCategoriesApi()
      const categories = transformCategories(res)
      setAccommodationCategories(categories)
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
  return res?.data
    .map(category => category?.fields[0]?.content)
    .map(category => ({ value: category, label: category }))
}
