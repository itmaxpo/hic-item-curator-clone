import React, { useState, useEffect } from 'react'
import { values, isEmpty } from 'lodash'
import Layout from 'components/Layout'
import { FlexContainer, DropdownSelect, TextField, Button } from '@tourlane/tourlane-ui'
import {
  Wrapper,
  CreateBoxContainer,
  InputContainer,
  MapContainer,
  Title,
  Location
} from './styles'
import mapPlaceholder from './mapPlaceholder.png'
import Map, { SearchBox } from 'components/Map'

const createOptions = [{ value: 'accommodation', label: 'Accommodation' }]

const supplierOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'coconut', label: 'Coconut' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'cashew', label: 'Cashew' },
  { value: 'cinnamon', label: 'Cinnamon' }
]

/**
 * Create Page component
 * The purpose of this page is to give the user the ability
 * to create new items
 *
 * @name Create
 * @returns {Object} Search Page
 */

const Create = () => {
  const [item, setItem] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [supplier, setSupplier] = useState(undefined)

  const [coordinates, setCoordinates] = useState(undefined)
  const [locationInfo, setLocationInfo] = useState(undefined)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const onLocationChangeHandler = place => {
    const location = place.geometry && place.geometry.location

    const newCoordinates = {
      lat: location.lat(),
      lng: location.lng()
    }

    setCoordinates(newCoordinates)

    const newLocationInfo = {
      name: place.name,
      info: place.formatted_address
    }

    setLocationInfo(newLocationInfo)
  }

  // effect to enable/disable submit button
  useEffect(() => {
    if (values({ item, name, supplier, coordinates }).some(isEmpty)) {
      setIsSubmitDisabled(true)
    } else {
      setIsSubmitDisabled(false)
    }
  }, [item, name, supplier, coordinates])

  return (
    <Layout>
      <Wrapper>
        <CreateBoxContainer direction="ttb">
          <Title>Create new item</Title>
          <FlexContainer p={0}>
            <InputContainer direction="ttb" justify="between">
              <DropdownSelect
                isClearable
                placeholder="Select Item"
                options={createOptions}
                value={item}
                onChange={value => setItem(value)}
              />
              <TextField placeholder="Name" onChange={e => setName(e.target.value)} />
              <DropdownSelect
                isCreatable
                isClearable
                placeholder="Select Supplier"
                options={supplierOptions}
                value={supplier}
                onChange={value => setSupplier(value)}
              />
              <Location>Location</Location>
              <SearchBox onChange={onLocationChangeHandler} />
              <Button disabled={isSubmitDisabled}>Submit</Button>
            </InputContainer>
            <MapContainer>
              {coordinates ? (
                <Map coordinates={coordinates} locationInfo={locationInfo} />
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

export default Create
