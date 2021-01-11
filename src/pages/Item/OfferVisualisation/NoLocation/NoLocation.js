import React from 'react'
import { Flex, FlexContainer, H3, Base } from '@tourlane/tourlane-ui'
import NoLocationPlaceholder from 'icons/no-location.svg'

const NoLocation = ({ alt, width = 'auto', height = 'auto' }) => (
  <Flex data-test="no-location" direction="ttb" align="center">
    <img src={NoLocationPlaceholder} alt={alt} height={height} width={width} />
    <FlexContainer direction="ttb" align="center" p={0} pt={1}>
      <H3 withSpacing>No Geolocation</H3>
      <Base>Unfortunately, there are is no geolocation for this accommodation</Base>
    </FlexContainer>
  </Flex>
)

export default NoLocation
