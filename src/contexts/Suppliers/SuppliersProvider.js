import React, { createContext, useState, useMemo, useEffect } from 'react'
import { getSuppliers } from 'services/contentApi'
import { parseSuppliers } from './utils'

const SuppliersContext = createContext({
  suppliers: [],
  setSuppliers: () => {}
})

const { Provider } = SuppliersContext

/* Suppliers Context Provider
 *
 * Use when in need of access to suppliers (DMCs)
 */

const SuppliersContextProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([])
  const contextValue = useMemo(() => ({ suppliers, setSuppliers }), [suppliers])

  // fetch suppliers on mount
  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const { data } = await getSuppliers()
        setSuppliers(parseSuppliers(data))
      } catch (e) {
        console.error('Could not fetch suppliers.')
        console.log(e)
      }
    }

    fetchSuppliers()
  }, [])

  return <Provider value={contextValue}>{children}</Provider>
}

export default SuppliersContext
export { SuppliersContextProvider }
