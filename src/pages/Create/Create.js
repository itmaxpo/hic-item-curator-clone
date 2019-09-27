import React, { useState, useEffect, useContext } from 'react'
import { values, isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import Layout from 'components/Layout'
import { FlexContainer, DropdownSelect, TextField } from '@tourlane/tourlane-ui'
import {
  Wrapper,
  CreateBoxContainer,
  InputContainer,
  MapContainer,
  Title,
  Subtitle
} from './styles'
import { getLocationCoordinates } from './utils'
import mapPlaceholder from './mapPlaceholder.png'
import Map, { SearchBox } from 'components/Map'
import SuppliersContext from 'contexts/Suppliers'
import { createItem, createSupplier } from 'services/contentApi'
import ProgressButton from 'components/ProgressButton'
import { parseSuppliers } from 'contexts/Suppliers/utils'

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
  const [itemType, setItemType] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [supplier, setSupplier] = useState(undefined)

  const [coordinates, setCoordinates] = useState(undefined)
  const [polygon, setPolygon] = useState(undefined)
  const [locationInfo, setLocationInfo] = useState(undefined)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const [progressButtonState, setProgressButtonState] = useState('isButton')

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
    setProgressButtonState('isLoading')
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
      setProgressButtonState('isComplete')
      history.push(`/item/${data.uuid}?language=en-GB`)
    } catch (e) {
      console.warn(e)
    } finally {
      setProgressButtonState('isComplete')
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
              <ProgressButton
                data-test="submit"
                state={progressButtonState}
                disabled={isSubmitDisabled}
                label={'Create Item'}
                onButtonClick={onCreateItemHandler}
              />
            </InputContainer>
            <MapContainer>
              {coordinates ? (
                <Map coordinates={coordinates} polygon={polygon} locationInfo={locationInfo} />
              ) : (
                <img src={mapPlaceholder} alt="map-placeholder" />
              )}
            </MapContainer>
          </FlexContainer>
        </CreateBoxContainer>
      </Wrapper>
    </Layout>
  )
}

export default withRouter(Create)
