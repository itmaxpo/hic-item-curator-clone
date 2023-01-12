import { AreaType } from '../../pages/Area/areaApi'

export const MockAreaData: { data: AreaType } = {
  data: {
    active_destination: true,
    additional_info: null,
    ancestors: [
      { uuid: 'c44b8127-1529-4df0-ad52-bc084f5df7ee', item_type: 'Country' },
      { uuid: '08830344-7833-4663-b37c-2a3bc91fe9f7', item_type: 'Continent' }
    ],
    area_type: 'admin',
    centroid: null,
    climate: null,
    cuisine: null,
    currency: null,
    description: null,
    dress: null,
    electricity: null,
    entry_requirements: null,
    health: null,
    name: 'Mock name',
    offer_preview: {
      lead: 'Mock lead',
      title: 'Mock Title',
      heading: 'Mock heading',
      introduction: 'Mock introduction'
    },
    original_name: 'Western Cape',
    safety: null,
    transport: null,
    uuid: '55e3bb6d-14cc-4e37-ae1c-173813f8e4c1',
    visualization_destination: true,
    iso_code: '',
    wetu_id: ''
  }
}
