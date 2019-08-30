import React, { createContext, useState, useMemo, useEffect } from 'react'
import { getSuppliers } from 'services/searchApi'
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

  const contextValue = useMemo(() => ({ suppliers }), [suppliers])

  // fetch suppliers on mount
  useEffect(() => {
    async function fetchSuppliers() {
      const { data } = await getSuppliers()
      setSuppliers(parseSuppliers(data))
    }

    fetchSuppliers()
  }, [])

  return <Provider value={contextValue}>{children}</Provider>
}

export default SuppliersContext
export { SuppliersContextProvider }
