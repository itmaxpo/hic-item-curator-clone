import { Suspense } from 'react'
import { flatten } from 'lodash'
import LazyLoad from 'react-lazyload'

import { H5, Skeleton, BlurInTransition, Flex } from '@tourlane/tourlane-ui'

import { parsePolygonCoordinates } from '../utils'
import { FIELD_ADDRESS, FIELD_GEOLOCATION, FIELD_NAME, FIELD_ORIGINAL_NAME } from '../../itemParser'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { MapWrapper, NoLocationWrapper, TitleWithContent } from '../styles'
import { AccommodationLocation } from '../AccommodationLocation'
import Loader from 'components/Loader'
import Map from 'components/Map'
import NoLocation from '../NoLocation'
import { PageProps } from 'types/PageProps'

interface Props {
  item: PageProps
  isEditing: boolean
  isLoadingAdditionalInfo: boolean
  onGeolocationUpdate: () => void
}

const Location = ({ item, isEditing, isLoadingAdditionalInfo, onGeolocationUpdate }: Props) => {
  const isMultipolygon = item.polygon.length > 1

  const polygon = item.polygon.length
    ? isMultipolygon
      ? item.polygon.map((multipolygon) => parsePolygonCoordinates(multipolygon))
      : [parsePolygonCoordinates(flatten(item.polygon))]
    : null

  // Define coordinates for accommodations
  const coordinates = item[FIELD_GEOLOCATION]
    ? { lat: item[FIELD_GEOLOCATION].lat, lng: item[FIELD_GEOLOCATION].lon }
    : undefined

  const locationInfo = {
    address: item[FIELD_ADDRESS] || item[FIELD_NAME] || item[FIELD_ORIGINAL_NAME],
    geoCoords: item[FIELD_GEOLOCATION]
  }

  const searchBoxAddress = {
    label: item[FIELD_ADDRESS] || ''.replace(/(\r\n|\n|\r)/gm, ''),
    value: item[FIELD_ADDRESS]
  }

  const shouldRenderMap = (coordinates && coordinates.lat && coordinates.lng) || polygon

  return (
    <TitleWithContent>
      <H5 withBottomPadding data-test={'item-location-header'}>
        Location
      </H5>
      {isEditing && item.type === ACCOMMODATION_ITEM_TYPE && (
        <Flex mb={40}>
          <AccommodationLocation
            address={searchBoxAddress}
            geolocation={{ lat: coordinates?.lat as number, lon: coordinates?.lng as number }}
            onChange={onGeolocationUpdate}
          />
        </Flex>
      )}
      <MapWrapper>
        {shouldRenderMap ? (
          <LazyLoad height="500px" once style={{ height: '100%', width: '100%' }}>
            <Suspense fallback={<Skeleton height="500px" />}>
              <BlurInTransition>
                <Map coordinates={coordinates} polygon={polygon} locationInfo={locationInfo} />
              </BlurInTransition>
            </Suspense>
          </LazyLoad>
        ) : (
          <LazyLoad height="500px" once>
            <NoLocationWrapper p={0} pt={1} justify="center">
              <Suspense fallback={<Loader top={'45%'} />}>
                <BlurInTransition style={{ width: 'auto', height: 'auto' }}>
                  <NoLocation alt="map-placeholder" height="70%" width="70%" />
                </BlurInTransition>
              </Suspense>
            </NoLocationWrapper>
          </LazyLoad>
        )}
        {isLoadingAdditionalInfo && <Loader top={'45%'} />}
      </MapWrapper>
    </TitleWithContent>
  )
}

export default Location
