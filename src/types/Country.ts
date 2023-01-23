export interface Blocked {
  notes: string
  reason: string
  markets: ['tourlane.co.uk', 'tourlane.de', 'tourlane.nl', 'tourlane.fr', 'tourlane.com']
}

export interface Information {
  additional_info: string
  climate: string
  cuisine: string
  currency: string
  electricity: string
  entry_requirements: string
  health: string
  safety: string
  transport: string
}

export interface CountryType extends Information {
  uuid: string
  name: string
  iso_code: string
  id: number

  original_name: string
  description: string
  capital: string
  offer_preview: {
    lead: string
    title: string
    heading: string
    introduction: string
  }
  eu?: boolean
  marketing_active_markets: ['tourlane.de']
  health: string
  safety: string
  electricity: string
  currency: string
  entry_requirements: string
  active_destination: boolean
  iso_code_3: string
  supply_active_markets: []
  dress: string
}
