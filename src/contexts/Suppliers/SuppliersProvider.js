import React, { createContext, useState, useMemo, useEffect } from 'react'
import { getSuppliers } from 'services/configurationsApi'
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
        const suppliers = await getSuppliers()
        setSuppliers(parseSuppliers(suppliers))
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
