import { render, screen, waitFor, fireEvent, prettyDOM } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createEvent } from '@testing-library/dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Area from '../index'
import * as areaApi from '../areaApi'
import * as getItemAttachments from 'services/attachmentsApi'
import * as getItemPolygonCoordinatesById from 'services/contentApi'
import { createPasteEvent } from 'utils/testUtil'
import { MockAreaData } from 'utils/__mocks__/Area'

jest.mock('@tourlane/rooster', () => ({
  __esModule: true,
  SelectMarket: jest.fn().mockReturnValue({})
}))

jest.mock('components/Notification', () => ({
  useNotification: () => ({
    enqueueNotification: jest.fn()
  })
}))

const mockFetchArea = jest.spyOn(areaApi, 'getAreaById')
const mockUpdateArea = jest.spyOn(areaApi, 'updateAreas')
const mockFetchImage = jest.spyOn(getItemAttachments, 'getItemAttachments')
const mockFetchPolygon = jest.spyOn(getItemPolygonCoordinatesById, 'getItemPolygonCoordinatesById')

const renderAreaPage = () =>
  render(
    <Router>
      <Area />
    </Router>
  )

describe('Area Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetchArea.mockResolvedValue(
      new Promise((resolve) => resolve(MockAreaData.data as areaApi.AreaType))
    )
    mockFetchImage.mockResolvedValue(new Promise((resolve) => resolve([])))
    mockFetchPolygon.mockResolvedValue(
      new Promise((resolve) =>
        resolve({
          data: {
            centroid: 'Mock Centroid',
            coordinates: [],
            type: 'Mock type'
          }
        })
      )
    )
  })

  it('it should get the Area data', async () => {
    await renderAreaPage()
    await waitFor(() => {
      expect(screen.getByText('Mock name')).toBeInTheDocument()
      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByText('Visualization destination')).toBeInTheDocument()
      expect(screen.getByText('Mock lead')).toBeInTheDocument()
      expect(screen.getByText('Mock Title')).toBeInTheDocument()
      expect(screen.getByText('Mock heading')).toBeInTheDocument()
      expect(screen.getByText('Mock introduction')).toBeInTheDocument()
      expect(screen.queryAllByText('No information found')).toHaveLength(10)
    })
  })

  it('it should update area when click on save button', async () => {
    const { container } = await renderAreaPage()

    mockUpdateArea.mockResolvedValue(
      new Promise((resolve) => resolve(MockAreaData.data as areaApi.AreaType))
    )
    const editButton = await screen.findByRole('button', { name: 'Edit Content' })
    await userEvent.click(editButton)

    const name = await screen.findByTestId('area_name')
    fireEvent.change(name, { target: { value: 'new name' } })

    const activeDestination = await screen.findByTestId('active_destination')
    fireEvent.click(activeDestination)

    const visualizationDestination = await screen.findByTestId('visualization_destination')
    fireEvent.click(visualizationDestination)

    const offer_preview_title = await screen.findByTestId('offer_preview_title')
    fireEvent.change(offer_preview_title, { target: { value: 'new offer preview title' } })

    const offer_preview_heading = await screen.findByTestId('offer_preview_heading')
    fireEvent.change(offer_preview_heading, {
      target: { value: 'new offer preview heading' }
    })

    const offer_preview_lead = await screen.findByTestId('offer_preview_lead')
    fireEvent.change(offer_preview_lead, {
      target: { value: 'new offer preview lead' }
    })

    const offer_preview_introduction = await screen.findByTestId('offer_preview_introduction')
    fireEvent.change(offer_preview_introduction, {
      target: { value: 'new offer preview body copy' }
    })

    const description = container.querySelector(
      '[data-test="description"] .public-DraftEditor-content'
    ) as any
    const description_eventProperties = createPasteEvent('new description')
    const description_pasteEvent = createEvent.paste(
      description,
      description_eventProperties
    ) as any
    fireEvent(description, description_pasteEvent)

    const additional_info = container.querySelector(
      '[data-test="additional_info"] .public-DraftEditor-content'
    ) as any
    const additional_info_eventProperties = createPasteEvent('new additional info ')
    const additional_info_pasteEvent = createEvent.paste(
      additional_info,
      additional_info_eventProperties
    ) as any
    fireEvent(additional_info, additional_info_pasteEvent)

    const climate = container.querySelector(
      '[data-test="climate"] .public-DraftEditor-content'
    ) as any
    const climate_eventProperties = createPasteEvent('new climate')
    const climate_pasteEvent = createEvent.paste(climate, climate_eventProperties) as any
    fireEvent(climate, climate_pasteEvent)

    const cuisine = container.querySelector(
      '[data-test="cuisine"] .public-DraftEditor-content'
    ) as any
    const cuisine_eventProperties = createPasteEvent('new cuisine')
    const cuisine_pasteEvent = createEvent.paste(cuisine, cuisine_eventProperties) as any
    fireEvent(cuisine, cuisine_pasteEvent)

    const currency = container.querySelector(
      '[data-test="currency"] .public-DraftEditor-content'
    ) as any
    const currency_eventProperties = createPasteEvent('new currency')
    const currency_pasteEvent = createEvent.paste(currency, currency_eventProperties) as any
    fireEvent(currency, currency_pasteEvent)

    const dress = container.querySelector('[data-test="dress"] .public-DraftEditor-content') as any
    const dress_eventProperties = createPasteEvent('new dress')
    const dress_pasteEvent = createEvent.paste(dress, dress_eventProperties) as any
    fireEvent(dress, dress_pasteEvent)

    const electricity = container.querySelector(
      '[data-test="electricity"] .public-DraftEditor-content'
    ) as any
    const electricity_eventProperties = createPasteEvent('new electricity')
    const electricity_pasteEvent = createEvent.paste(
      electricity,
      electricity_eventProperties
    ) as any
    fireEvent(electricity, electricity_pasteEvent)

    const entry_requirements = container.querySelector(
      '[data-test="entry_requirements"] .public-DraftEditor-content'
    ) as any
    const entry_requirements_eventProperties = createPasteEvent('new entry requirements')
    const entry_requirements_pasteEvent = createEvent.paste(
      entry_requirements,
      entry_requirements_eventProperties
    ) as any
    fireEvent(entry_requirements, entry_requirements_pasteEvent)

    const health = container.querySelector(
      '[data-test="health"] .public-DraftEditor-content'
    ) as any
    const health_eventProperties = createPasteEvent('new health')
    const health_pasteEvent = createEvent.paste(health, health_eventProperties) as any
    fireEvent(health, health_pasteEvent)

    const safety = container.querySelector(
      '[data-test="safety"] .public-DraftEditor-content'
    ) as any
    const safety_eventProperties = createPasteEvent('new safety')
    const safety_pasteEvent = createEvent.paste(safety, safety_eventProperties) as any
    fireEvent(safety, safety_pasteEvent)

    const transport = container.querySelector(
      '[data-test="transport"] .public-DraftEditor-content'
    ) as any
    const transport_eventProperties = createPasteEvent('new transport')
    const transport_pasteEvent = createEvent.paste(transport, transport_eventProperties) as any
    fireEvent(transport, transport_pasteEvent)

    const saveButton = await screen.findByTestId('update-area')
    await userEvent.click(saveButton)

    expect(mockUpdateArea).toHaveBeenCalledWith(MockAreaData.data.uuid, null, {
      name_item_curator: 'new name',
      active_destination: false,
      visualization_destination: false,
      offer_preview: {
        title: 'new offer preview title',
        heading: 'new offer preview heading',
        lead: 'new offer preview lead',
        introduction: 'new offer preview body copy'
      },
      description_item_curator: '<p>new description</p>\n',
      additional_info_item_curator: '<p>new additional info</p>\n',
      climate_item_curator: '<p>new climate</p>\n',
      cuisine_item_curator: '<p>new cuisine</p>\n',
      currency_item_curator: '<p>new currency</p>\n',
      dress_item_curator: '<p>new dress</p>\n',
      electricity_item_curator: '<p>new electricity</p>\n',
      entry_requirements_item_curator: '<p>new entry requirements</p>\n',
      health_item_curator: '<p>new health</p>\n',
      safety_item_curator: '<p>new safety</p>\n',
      transport_item_curator: '<p>new transport</p>\n'
    })
  })
})
