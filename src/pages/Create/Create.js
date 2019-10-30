import React, { lazy, Suspense, useState, useEffect, useContext } from 'react'
import { values, isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import Layout from 'components/Layout'
import {
  FlexContainer,
  DropdownSelect,
  TextField,
  ProgressButton,
  BlurInTransition
} from '@tourlane/tourlane-ui'
import {
  Wrapper,
  CreateBoxContainer,
  InputContainer,
  MapContainer,
  Title,
  Subtitle,
  SubmitButtonWrapper,
  Loader
} from './styles'
import { getLocationCoordinates } from './utils'
import noLocationPlaceholder from './no-location.svg'
import { SearchBox } from 'components/Map'
import SuppliersContext from 'contexts/Suppliers'
import { createItem, createSupplier } from 'services/contentApi'
import { parseSuppliers } from 'contexts/Suppliers/utils'
import { useNotification } from 'components/Notification'
import LazyLoader from 'components/LazyLoader'

const Map = lazy(() => import(/* webpackChunkName: "Map" */ 'components/Map'))

const createOptions = [{ value: 'accommodation', label: 'Accommodation' }]

/**
 * Create Page component
 * The purpose of this page is to give the user the ability
 * to create new items
 *
 * @name Create
 * @returns {Object} Search Page
 */

const Create = ({ history }) => {
  const { enqueueNotification } = useNotification()

  const [itemType, setItemType] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [supplier, setSupplier] = useState(undefined)

  const [coordinates, setCoordinates] = useState(undefined)
  const [polygon, setPolygon] = useState(undefined)
  const [locationInfo, setLocationInfo] = useState(undefined)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const { suppliers, setSuppliers } = useContext(SuppliersContext)

  const onLocationChangeHandler = place => {
    if (isEmpty(place)) return

    const { coordinates: newCoordinates, polygon } = getLocationCoordinates(place)
    setCoordinates(newCoordinates)
    setPolygon(polygon)

    const newLocationInfo = {
      address: place.label,
      geoCoords: newCoordinates
    }

    setLocationInfo(newLocationInfo)
  }

  const onCreateItemHandler = async () => {
    try {
      if (!suppliers.some(supp => supp.value === supplier.value)) {
        const newSupplier = await createSupplier(supplier.value)
        setSuppliers([...suppliers, ...parseSuppliers([newSupplier.data])])
      }

      const { data } = await createItem(
        itemType.value,
        name,
        supplier.value,
        coordinates.lat,
        coordinates.lng,
        locationInfo.address
      )

      // 2.5s delay to let progress button animation finish
      setTimeout(() => {
        history.push(`/item/${data.uuid}?language=en-GB`)
      }, 2500)
    } catch (e) {
      console.warn(e)
      enqueueNotification({ variant: 'error', message: 'Failed to create item' })
    }
  }

  // effect to enable/disable submit button
  useEffect(() => {
    if (values({ itemType, name, supplier, coordinates }).some(isEmpty)) {
      setIsSubmitDisabled(true)
    } else {
      setIsSubmitDisabled(false)
    }
  }, [itemType, name, supplier, coordinates])

  return (
    <Layout>
      <Wrapper data-test="createItemPage">
        <CreateBoxContainer direction="ttb">
          <Title>Create new item</Title>
          <FlexContainer p={0}>
            <InputContainer direction="ttb" justify="between">
              <div data-test="item">
                <DropdownSelect
                  isClearable
                  placeholder="Select Item"
                  options={createOptions}
                  value={itemType}
                  onChange={value => setItemType(value)}
                />
              </div>
              <TextField
                data-test="name"
                placeholder="Name"
                onChange={e => setName(e.target.value)}
              />
              <div data-test="supplier">
                <DropdownSelect
                  isCreatable
                  isClearable
                  placeholder="Supplier tag"
                  options={suppliers}
                  value={supplier}
                  onChange={value => setSupplier(value)}
                />
              </div>
              <Subtitle>Address</Subtitle>
              <div data-test="address">
                <SearchBox onChange={onLocationChangeHandler} />
              </div>
              <SubmitButtonWrapper data-test="submit">
                <ProgressButton
                  disabled={isSubmitDisabled}
                  onButtonClick={onCreateItemHandler}
                  mockUpload
                  uploadTime={2000}
                >
                  Create Item
                </ProgressButton>
              </SubmitButtonWrapper>
            </InputContainer>
            <MapContainer>
              <Suspense fallback={<Loader />}>
                <LazyLoad height="381" once>
                  {coordinates ? (
                    <BlurInTransition animationDuration="1000ms">
                      <Map
                        coordinates={coordinates}
                        polygon={polygon}
                        locationInfo={locationInfo}
                      />
                    </BlurInTransition>
                  ) : (
                    <LazyLoader src={noLocationPlaceholder} height="381">
                      <img
                        src={noLocationPlaceholder}
                        alt="map-placeholder"
                        height="100%"
                        width="100%"
                      />
                    </LazyLoader>
                  )}
                </LazyLoad>
              </Suspense>
            </MapContainer>
          </FlexContainer>
        </CreateBoxContainer>
      </Wrapper>
    </Layout>
  )
}

export default withRouter(Create)
