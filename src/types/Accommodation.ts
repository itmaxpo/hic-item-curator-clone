export interface Ancestors {
  uuid: string
  item_type: string
}

export interface Blocked {
  notes: string
  reason: string
  markets: ['tourlane.co.uk', 'tourlane.de', 'tourlane.nl', 'tourlane.fr', 'tourlane.com']
}

export interface AccommodationType {
  uuid: string
  name: string
  original_name: string
  description: string
  accommodation_type_id: number
  accommodation_category_id: string | null
  merged_uuids: string[]
  wetu_id: string
  giata_id: string
  front_desk_phone: string
  rating: number
  ranking: number
  address: string
  additional_info: string
  google_place_id: string
  blocked: Blocked | null
  dmcs: Record<string, string>
  alt_names: string[]
  location: {
    lat: number
    lon: number
  } | null
  ancestors: Ancestors[]
}
