import { FC, useEffect, useState, ChangeEvent } from 'react'
import { Flex, ExtraSmall, Label, Radio, COLORS, TextField } from '@tourlane/tourlane-ui'
import SearchIcon from '@tourlane/iconography/Glyphs/Navigation/Search'
import { SearchBox } from 'components/Map'
import { searchAddress } from 'services/addressApi'
import { debounce } from 'lodash'

type LocationType = 'address' | 'geolocation'

export type Geolocation = { lat: number; lon: number }

interface AccommodationLocationProps {
  address: { label: string; value: string }
  geolocation: Geolocation
  onChange: (geolocation: Geolocation, address: string) => void
}

export const AccommodationLocation: FC<AccommodationLocationProps> = ({
  address,
  geolocation,
  onChange
}) => {
  const [locationType, setLocationType] = useState<LocationType>('address')

  const [newGeolocation, setNewGeolocation] = useState<Geolocation>(geolocation)

  useEffect(() => setNewGeolocation(geolocation), [geolocation])

  const locationTypeChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setLocationType(value as LocationType)

  const searchAddressByGeolocation = async (nextGeolocation: Geolocation) => {
    if (nextGeolocation?.lat && nextGeolocation?.lon) {
      try {
        const response = await searchAddress<{ display_name: string }>({
          ...nextGeolocation
        })
        if (response) {
          const { display_name } = response
          onChange({ lat: nextGeolocation.lat, lon: nextGeolocation.lon }, display_name)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const onGeolocationChange = debounce(
    ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
      const nextGeolocation =
        name === 'lat'
          ? { lat: +value, lon: newGeolocation?.lon }
          : { lat: newGeolocation?.lat, lon: +value }
      setNewGeolocation(nextGeolocation)
      searchAddressByGeolocation(nextGeolocation)
    },
    1000
  )

  return (
    <Flex direction="column" flex={1}>
      <ExtraSmall>Please add either address or geolocation.</ExtraSmall>
      <ExtraSmall italic={true} color={COLORS.INACTIVE_GRAY} withBottomMargin={true}>
        The other location will be populated automatically. E.g. If you populate the address, the
        geolocation will be added by default.
      </ExtraSmall>
      <Flex mt={12} mb={24}>
        <Flex mr={42}>
          <Label>
            <Radio
              value="address"
              name="location"
              checked={locationType === 'address'}
              onChange={locationTypeChange}
            />
            Add Address
          </Label>
        </Flex>
        <Flex>
          <Label>
            <Radio
              value="geolocation"
              name="location"
              checked={locationType === 'geolocation'}
              onChange={locationTypeChange}
            />
            Add Geolocation
          </Label>
        </Flex>
      </Flex>
      <Flex>
        {locationType === 'address' && (
          <Flex flex={0.5} data-test="address">
            <SearchBox
              placeholder="Search street name and number"
              icon={<SearchIcon />}
              value={address}
              onChange={(option: { lat: string; lon: string; label: string } | null) => {
                if (option) {
                  const { lat, lon, label } = option
                  onChange({ lat: +lat, lon: +lon }, label)
                } else {
                  onChange(geolocation, '')
                }
              }}
            />
          </Flex>
        )}
        {locationType === 'geolocation' && (
          <Flex>
            <Flex pr={16}>
              <TextField
                type="number"
                name="lat"
                data-test="latitude"
                placeholder="Latitude"
                value={newGeolocation.lat}
                onChange={onGeolocationChange}
              />
            </Flex>
            <Flex>
              <TextField
                type="number"
                name="lon"
                data-test="longitude"
                placeholder="Longitude"
                value={newGeolocation.lon}
                onChange={onGeolocationChange}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
