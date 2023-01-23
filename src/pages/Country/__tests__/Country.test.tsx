import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import * as countryApi from 'pages/Country/coutryApi'
import * as getItemAttachments from 'services/attachmentsApi'
import { updateFormValues } from 'utils/testUtil'
import {
  MockCountryDisplayData,
  MockCountryEditData,
  ACCORDION_ITEMS
} from 'pages/Country/__mocks__/country'
import { CountryType } from 'types/Country'
import { Country } from '../Country'

jest.mock('@tourlane/rooster', () => ({
  __esModule: true,
  SelectMarket: jest.fn().mockReturnValue({})
}))

jest.mock('components/Notification', () => ({
  useNotification: () => ({
    enqueueNotification: jest.fn()
  })
}))

const mockFetchCountry = jest.spyOn(countryApi, 'getCountryById')
const mockUpdateCountry = jest.spyOn(countryApi, 'updateCountry')
const mockFetchImage = jest.spyOn(getItemAttachments, 'getItemAttachments')

const renderCountryPage = () =>
  render(
    <Router>
      <Country />
    </Router>
  )

describe('Country Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetchImage.mockResolvedValue(new Promise((resolve) => resolve([])))
  })

  it('it should render the Country page data', async () => {
    mockFetchCountry.mockResolvedValue(
      new Promise((resolve) => resolve(MockCountryDisplayData.data as CountryType))
    )
    await renderCountryPage()

    await waitFor(() => {
      expect(screen.getByText('South africa')).toBeInTheDocument()
      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByText('Lead goes here')).toBeInTheDocument()
      expect(screen.getByText('Title test here')).toBeInTheDocument()
      expect(screen.getByText('Test heading')).toBeInTheDocument()
      expect(screen.getByText('introduction description goes here')).toBeInTheDocument()

      Object.keys(ACCORDION_ITEMS).forEach((testId) =>
        // @ts-ignore
        expect(screen.getByTestId(testId)).toHaveTextContent(ACCORDION_ITEMS[testId])
      )
    })
  })

  it('it should update country page when click on save button', async () => {
    mockFetchCountry.mockResolvedValue(
      new Promise((resolve) => resolve(MockCountryEditData.data as CountryType))
    )
    mockUpdateCountry.mockResolvedValue(
      new Promise((resolve) => resolve(MockCountryDisplayData.data as CountryType))
    )

    const { container } = await renderCountryPage()

    await updateFormValues(container, 'country')

    expect(mockUpdateCountry).toHaveBeenCalledWith(MockCountryDisplayData.data.uuid, null, {
      name: 'new name',
      active_destination: false,
      offer_preview: {
        title: 'new offer preview title',
        heading: 'new offer preview heading',
        lead: 'new offer preview lead',
        introduction: 'new offer preview introduction'
      },
      description_item_curator: '<p>new description</p>\n',
      additional_info_item_curator: '<p>new additional info</p>\n',
      climate_item_curator: '<p>new climate</p>\n',
      cuisine_item_curator: '<p>new cuisine</p>\n',
      currency_item_curator: '<p>new currency</p>\n',
      dress_item_curator: '<p>new dress</p>\n',
      electricity_item_curator: '<p>new electricity</p>\n',
      transport_item_curator: '<p>new transport</p>\n',
      entry_requirements_item_curator: '<p>new entry requirements</p>\n',
      health_item_curator: '<p>new health</p>\n',
      safety_item_curator: '<p>new safety</p>\n'
    })
  })
})
