export interface Ancestors {
  uuid: string
  item_type: string
}

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
  dress: string
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
  id: string

  original_name: string
  description: string
  capital: string
  offer_preview: {
    lead: string
    title: string
    heading: string
    introduction: string
  }
  eu: string
  marketing_active_markets: ['tourlane.de']
  health: string
  safety: string
  electricity: string
  currency: string
  entry_requirements: string
  active_destination: boolean
}
