import React, { Suspense } from 'react'
import LazyLoad from 'react-lazyload'
import { Skeleton, BlurInTransition, Box } from '@tourlane/tourlane-ui'
import MapComponent from 'components/Map'
import Loader from 'components/Loader'
import NoLocation from '../Item/OfferVisualisation/NoLocation'

export const Map = ({ coordinates }) =>
  coordinates.lat && coordinates.lng ? (
    <LazyLoad height="500px" once>
      <Suspense fallback={<Skeleton height="500px" />}>
        <BlurInTransition>
          <MapComponent coordinates={coordinates} />
        </BlurInTransition>
      </Suspense>
    </LazyLoad>
  ) : (
    <LazyLoad height="500px" once>
      <Box pt={[12, 12, 15, 18, 24]} justify="center">
        <Suspense fallback={<Loader top={'45%'} />}>
          <BlurInTransition style={{ width: 'auto', height: 'auto' }}>
            <NoLocation alt="map-placeholder" height="140px" />
          </BlurInTransition>
        </Suspense>
      </Box>
    </LazyLoad>
  )
