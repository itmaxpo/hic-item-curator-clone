import * as searchApi from 'services/searchApi'

describe('searchApi.js', () => {
  it('to be defined', () => {
    expect(searchApi).toBeDefined()
    expect(searchApi.getCountries).toBeDefined()
    expect(searchApi.getAreasInCountry).toBeDefined()
    expect(searchApi.getAccommodations).toBeDefined()
  })
})
