import { getJson } from './request'

export interface ISupplier {
  uuid: string
  name: string
  supplier_id?: string | null
  allow_template_creation: boolean
  activities_configuration: {
    active: boolean
  }
  accommodations_configuration: {
    active: boolean
  }
  packages_configuration: {
    active: boolean
  }
  enabled_market_destinations?: { destination: string }[]
}

const _suppliersCache: Record<string, Promise<ISupplier[]>> = {}
const suppliers = 'suppliers' as const

export const getSuppliers = async (): Promise<ISupplier[]> => {
  if (!_suppliersCache[suppliers]) {
    _suppliersCache[suppliers] = new Promise(async (resolve, reject) => {
      try {
        const allSuppliers = await getJson<ISupplier[]>(
          `${process.env.REACT_APP_PARTNERS_API}/configurations/v2/suppliers.json`
        )
        resolve(allSuppliers.filter(({ supplier_id }) => supplier_id))
      } catch (e) {
        reject(e)
      }
    })
  }
  return _suppliersCache[suppliers] as Promise<ISupplier[]>
}
