import { H5, Box, Flex } from '@tourlane/tourlane-ui'

import { parsePolygonCoordinates } from '../../Item/OfferVisualisation/utils'
import Map from 'components/Map'
import NoLocation from 'components/NoLocation'

const Location = ({ polygonData, locationInfo }: any) => {
  const polygon = polygonData.map((multiPolygon: any) => parsePolygonCoordinates(multiPolygon))
  return (
    <Box mt={40} mb={40} fullWidth height="500px">
      <H5 withBottomPadding data-test={'item-location-header'}>
        Location
      </H5>
      {polygonData ? (
        <Map polygon={polygon} locationInfo={locationInfo} />
      ) : (
        <Flex p={0} pt={1} justify="center" fullHeight>
          <NoLocation alt="map-placeholder" height="70%" width="70%" itemType="admin_area" />
        </Flex>
      )}
    </Box>
  )
}

export default Location
