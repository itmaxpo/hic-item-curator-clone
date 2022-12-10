import React from 'react'
import { Flex, FlexContainer, H3, Base } from '@tourlane/tourlane-ui'
import NoLocationPlaceholder from 'icons/no-location.svg'
import { ACCOMMODATION_ITEM_TYPE, ACTIVITY_ITEM_TYPE, AREA_ITEM_TYPE } from 'utils/constants'

const displayNames = {
  [ACCOMMODATION_ITEM_TYPE]: 'accommodation',
  [ACTIVITY_ITEM_TYPE]: 'activity',
  [AREA_ITEM_TYPE]: 'area'
}

interface Props {
  alt?: string
  width?: string
  height?: string
  itemType?: typeof ACCOMMODATION_ITEM_TYPE | typeof ACTIVITY_ITEM_TYPE | typeof AREA_ITEM_TYPE
}

const NoLocation = ({
  alt,
  width = 'auto',
  height = 'auto',
  itemType = ACCOMMODATION_ITEM_TYPE
}: Props) => (
  <Flex data-test="no-location" direction="ttb" align="center">
    <img src={NoLocationPlaceholder} alt={alt} height={height} width={width} />
    <FlexContainer direction="ttb" align="center" p={0} pt={1}>
      <H3 withSpacing>No Geolocation</H3>
      <Base>Unfortunately, there are is no geolocation for this {displayNames[itemType]}</Base>
    </FlexContainer>
  </Flex>
)

export default NoLocation
