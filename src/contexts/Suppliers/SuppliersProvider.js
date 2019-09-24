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
    let fetchedSuppliers = [],
      offset = 0

    async function fetchSuppliersRecursively() {
      const suppliers = await getSuppliers(offset)
      fetchedSuppliers.push(...suppliers.data)
      offset += 50

      if (offset <= suppliers.meta.total_count) {
        await fetchSuppliersRecursively()
      } else {
        const suppliersLast = await getSuppliers(offset)
        fetchedSuppliers.push(...suppliersLast.data)
      }

      setSuppliers(parseSuppliers(fetchedSuppliers))
    }

    fetchSuppliersRecursively()
  }, [])

  return <Provider value={contextValue}>{children}</Provider>
}

export default SuppliersContext
export { SuppliersContextProvider }
