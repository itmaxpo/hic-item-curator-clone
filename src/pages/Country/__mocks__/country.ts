import { CountryType } from 'types/Country'

export const MockCountryDisplayData: { data: CountryType } = {
  data: {
    uuid: 'c44b8127-1529-4df0-ad52-bc084f5df7ee',
    name: 'South africa',
    iso_code: 'ZA',
    id: 214,
    original_name: 'South Africa',
    description: 'Description test',
    capital: 'kiwi://Elephant/Item/e862cc49-e5bb-4495-ba5e-8dce74be188f',
    offer_preview: {
      title: 'Title test here',
      lead: 'Lead goes here',
      heading: 'Test heading',
      introduction: 'introduction description goes here'
    },
    eu: false,
    iso_code_3: 'ZAF',
    supply_active_markets: [],
    marketing_active_markets: ['tourlane.de'],
    health: 'We strongly recommend that you consult with your doctor.',
    safety: 'Before providing advice to reduce the specific risks.',
    electricity: 'Current is 220/240 volts.',
    currency: 'Currency could be like that',
    entry_requirements: 'Entry requirements for British citizens.',
    cuisine: 'Cuisine description',
    climate: 'Climate description',
    transport: 'Travelling around South Africa is relatively easy by air.',
    additional_info: 'Here is additional info',
    active_destination: true,
    dress: 'Travelling around South Africa is relatively easy by air.'
  }
}

export const MockCountryEditData: { data: CountryType } = {
  data: {
    uuid: 'c44b8127-1529-4df0-ad52-bc084f5df7ee',
    name: 'South africa',
    iso_code: 'ZA',
    id: 214,
    original_name: 'South Africa',
    description: '',
    capital: 'kiwi://Elephant/Item/e862cc49-e5bb-4495-ba5e-8dce74be188f',
    offer_preview: {
      title: 'Title test here',
      lead: 'Lead goes here',
      heading: 'Test heading',
      introduction: 'introduction description goes here'
    },
    eu: false,
    iso_code_3: 'ZAF',
    supply_active_markets: [],
    marketing_active_markets: ['tourlane.de'],
    health: '',
    safety: '',
    electricity: '',
    currency: '',
    entry_requirements: '',
    cuisine: '',
    climate: '',
    transport: '',
    additional_info: '',
    active_destination: true,
    dress: ''
  }
}

export const ACCORDION_ITEMS = {
  additional_info: 'Here is additional info',
  climate: 'Climate description',
  cuisine: 'Cuisine description',
  currency: 'Currency could be like that',
  dress: 'Travelling around South Africa is relatively easy by air.',
  electricity: 'Current is 220/240 volts.',
  entry_requirements: 'Entry requirements for British citizens.',
  health: 'We strongly recommend that you consult with your doctor.',
  safety: 'Before providing advice to reduce the specific risks.',
  transport: 'Travelling around South Africa is relatively easy by air.',
  description: 'Description test'
}
