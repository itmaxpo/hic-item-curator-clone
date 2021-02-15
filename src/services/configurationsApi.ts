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

export const getSuppliers = async () =>
  getJson<ISupplier[]>(`${process.env.REACT_APP_KIWI_HOST}/configurations/v2/suppliers.json`)
