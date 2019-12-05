import React, { lazy, Suspense } from 'react'
import LazyLoad from 'react-lazyload'
import {
  FlexContainer,
  DropdownSelect,
  TextField,
  ProgressButton,
  BlurInTransition
} from '@tourlane/tourlane-ui'
import {
  CreateBoxContainer,
  InputContainer,
  MapContainer,
  Title,
  Subtitle,
  SubmitButtonWrapper,
  Loader
} from './styles'
import noLocationPlaceholder from './no-location.svg'
import { SearchBox } from 'components/Map'
import LazyLoader from 'components/LazyLoader'

const createOptions = [{ value: 'accommodation', label: 'Accommodation' }]

const Map = lazy(() => import(/* webpackChunkName: "Map" */ 'components/Map'))

const CreateForm = ({
  itemType,
  setItemType,
  setName,
  suppliers,
  supplier,
  setSupplier,
  onLocationChangeHandler,
  isSubmitDisabled,
  onCreateItemHandler,
  coordinates,
  polygon,
  locationInfo
}) => (
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
        <TextField data-test="name" placeholder="Name" onChange={e => setName(e.target.value)} />
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
                <Map coordinates={coordinates} polygon={polygon} locationInfo={locationInfo} />
              </BlurInTransition>
            ) : (
              <LazyLoader src={noLocationPlaceholder} height="381">
                <img src={noLocationPlaceholder} alt="map-placeholder" height="100%" width="100%" />
              </LazyLoader>
            )}
          </LazyLoad>
        </Suspense>
      </MapContainer>
    </FlexContainer>
  </CreateBoxContainer>
)

export default CreateForm
