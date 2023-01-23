import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createEvent } from '@testing-library/dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Area from '../index'
import * as areaApi from '../areaApi'
import * as getItemAttachments from 'services/attachmentsApi'
import * as getItemPolygonCoordinatesById from 'services/contentApi'
import { createPasteEvent, updateFormValues } from 'utils/testUtil'
import { MockAreaData } from 'pages/Area/__mocks__/area'

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

    await updateFormValues(container, 'area')

    expect(mockUpdateArea).toHaveBeenCalledWith(MockAreaData.data.uuid, null, {
      name_item_curator: 'new name',
      active_destination: false,
      visualization_destination: false,
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
      entry_requirements_item_curator: '<p>new entry requirements</p>\n',
      health_item_curator: '<p>new health</p>\n',
      safety_item_curator: '<p>new safety</p>\n',
      transport_item_curator: '<p>new transport</p>\n'
    })
  })
})
