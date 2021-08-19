import React, { lazy, Suspense, Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import { isEmpty, flatten, get } from 'lodash'
import { CountryCodeSelect } from '@tourlane/rooster'
import PhoneIcon from '@tourlane/iconography/Glyphs/Navigation/Phone'
import { SearchBox } from 'components/Map'
import Loader from 'components/Loader'
import {
  TitleWithContent,
  MapWrapper,
  LatLonWrapper,
  PhoneWrapper,
  PhoneBlock,
  AddressBlock,
  NoLocationWrapper,
  CountryCodeWrapper
} from './styles'
import { RichTextEditorLoader } from './Description/styles'
import {
  DESCRIPTION_COMPONENT_NAME,
  IMAGES_COMPONENT_NAME,
  INFORMATION_COMPONENT_NAME,
  LOCATION_COMPONENT_NAME,
  PHONE_COMPONENT_NAME,
  CATEGORY_AND_RANKING_COMPONENT_NAME
} from '../utils'
import { parsePolygonCoordinates } from './utils'
import {
  H4,
  AccordionGroup,
  Skeleton,
  BlurInTransition,
  Accordion,
  TextField,
  FlexContainer,
  Flex,
  Base
} from '@tourlane/tourlane-ui'
import ReactHtmlParser from 'react-html-parser'
import {
  itemSpecificFields,
  FIELD_ADDRESS,
  FIELD_NAME,
  FIELD_GEOLOCATION,
  FIELD_ORIGINAL_NAME,
  FIELD_FRONT_DESK_PHONE
} from '../itemParser'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { capitalize } from 'pages/Search/utils'

const NoLocation = lazy(() => import(/* webpackChunkName: "NoLocation" */ './NoLocation'))

const Description = lazy(() => import(/* webpackChunkName: "Description" */ './Description'))

const CategoryAndRanking = lazy(() =>
  import(/* webpackChunkName: "CategoryAndRanking" */ './CategoryAndRanking')
)

const ImageUploader = lazy(() =>
  import(/* webpackChunkName: "ImageUploader" */ 'components/ImageUploader')
)

const StyledRichTextEditor = lazy(() =>
  import(
    /* webpackChunkName: "StyledRichTextEditor" */ 'components/RichTextEditor/StyledRichTextEditor'
  )
)

const Map = lazy(() => import(/* webpackChunkName: "Map" */ 'components/Map'))

// Fake data to test components
const descriptions = (item) => {
  // active_destination ==> 'Active destination'
  const parseCountryFieldName = (fieldName) => capitalize(fieldName.split('_').join(' '))

  return itemSpecificFields[item.type]
    .filter((f) => f !== 'active_destination')
    .sort()
    .map((field) => ({
      label: parseCountryFieldName(field),
      field: field,
      value: !isEmpty(item[field]) && item[field]
    }))
}
// END of fake data

/**
 * This is the OfferVisualisation Tab component
 * Use it to render OfferVisualisation tab
 *
 * @name OfferVisualisation
 * @param {Object} item
 * @param {Object} phone
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange
 * @param {Function} onGeolocationUpdate
 * @param {Array<String>} components (order of components as a STRING to render)
 * @returns {Object} GlobalInformation Tab Component
 */
const OfferVisualisation = ({
  item,
  phone,
  isEditing,
  onChange,
  onGeolocationUpdate,
  onImagesAdd,
  components,
  isLoadingAdditionalInfo
}) => {
  // Based on the provided array of strings, that describes which component to render
  //
  // This function returns a map of the Components to be rendered for each element in the components array,
  // based on isEditing prop, Components will change their behavior/looks
  //
  // onChange callback is used to update item's property in the ItemPage
  //
  // This map always receives:
  //    - <key> to provide a specific key for every element to render them properly
  const componentsRenderingMap = {
    [DESCRIPTION_COMPONENT_NAME]: (key) => (
      <Description key={key} onChange={onChange} isEditing={isEditing} {...item} />
    ),
    [CATEGORY_AND_RANKING_COMPONENT_NAME]: (key) => (
      <CategoryAndRanking key={key} isEditing={isEditing} item={item} onChange={onChange} />
    ),

    [IMAGES_COMPONENT_NAME]: (key) => {
      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4 data-test={'item-images-header'}>Images</H4>
            <Suspense fallback={<Skeleton height="294px" />}>
              <ImageUploader
                id={item.id}
                isEditing={isEditing}
                onImagesUpdate={onChange}
                onImagesAdd={onImagesAdd}
                allImages={item.allImages}
                visibleImages={item.visibleImages}
              />
            </Suspense>
          </TitleWithContent>
        </Fragment>
      )
    },
    [INFORMATION_COMPONENT_NAME]: (key) => {
      const parsedDescriptions = descriptions(item)

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4 data-test={'item-information-header'}>Information</H4>
          </TitleWithContent>

          <AccordionGroup>
            {parsedDescriptions.map((d, i) => (
              <Accordion
                data-test={`item-information-${d.field}`}
                key={i}
                name={d.field}
                title={d.label}
              >
                {isEditing ? (
                  <Suspense fallback={<RichTextEditorLoader />}>
                    <StyledRichTextEditor
                      data-test={`item-information-${d.field}-editor`}
                      placeholder={`Please write something about the ${d.label.toLowerCase()}`}
                      value={d.value}
                      onChange={(val) => onChange(d.field, val)}
                    />
                  </Suspense>
                ) : (
                  ReactHtmlParser(d.value || 'No information found')
                )}
              </Accordion>
            ))}
          </AccordionGroup>
        </Fragment>
      )
    },
    [PHONE_COMPONENT_NAME]: (key) => {
      let phoneText
      if (phone.dialCode && phone.phoneNumber && phone.isValid) {
        phoneText = `${phone.dialCode} ${phone.phoneNumber}`
      } else {
        phoneText = 'No number added'
      }

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4 data-test={'item-location-header'}>Front desk number</H4>

            {isEditing ? (
              <PhoneBlock direction="ttb">
                <FlexContainer direction={'ltr'} pr={0} pl={0}>
                  <CountryCodeWrapper>
                    <CountryCodeSelect
                      initialCountryCode={phone.countryCode}
                      value={phone.countryCode}
                      onChange={(str) =>
                        onChange(
                          FIELD_FRONT_DESK_PHONE,
                          str.dialCode + phone.phoneNumber,
                          item[FIELD_FRONT_DESK_PHONE]
                        )
                      }
                    />
                  </CountryCodeWrapper>
                  <PhoneWrapper>
                    <TextField
                      data-test={'item-phone-number'}
                      type="tel"
                      shrinkPlaceholder
                      placeholder={'Phone'}
                      value={phone.phoneNumber}
                      onValueChange={(num) =>
                        onChange(
                          FIELD_FRONT_DESK_PHONE,
                          phone.dialCode + num,
                          item[FIELD_FRONT_DESK_PHONE]
                        )
                      }
                      icon={<PhoneIcon />}
                    />
                  </PhoneWrapper>
                </FlexContainer>
              </PhoneBlock>
            ) : (
              <Flex>
                <Base>{phoneText}</Base>
              </Flex>
            )}
          </TitleWithContent>
        </Fragment>
      )
    },
    [LOCATION_COMPONENT_NAME]: (key) => {
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

      // Updating address and geolocation with a separate request
      const onLocationChangeHandler = (address, geolocation) => {
        if (!address) {
          onGeolocationUpdate(geolocation, '')
        } else {
          onGeolocationUpdate({ lat: +address.lat, lon: +address.lon }, address.label)
        }
      }

      const searchBoxAddress = {
        label: item[FIELD_ADDRESS] || ''.replace(/(\r\n|\n|\r)/gm, ''),
        value: item[FIELD_ADDRESS]
      }

      const shouldRenderMap = (coordinates && coordinates.lat && coordinates.lng) || polygon

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4 data-test={'item-location-header'}>Location</H4>
            {isEditing && item.type === ACCOMMODATION_ITEM_TYPE && (
              <AddressBlock p={0} pb={1.5} direction="ttb">
                <div data-test="address">
                  <SearchBox
                    placeholder="Address"
                    defaultValue={searchBoxAddress}
                    onChange={onLocationChangeHandler}
                  />
                </div>
                <LatLonWrapper p={0} pt={1} justifyContent="between">
                  <TextField
                    type="number"
                    disabled={!!item[FIELD_ADDRESS]}
                    data-test="latitude"
                    placeholder="Latitude"
                    value={get(coordinates, 'lat', '')}
                    onChange={(e) =>
                      onLocationChangeHandler(null, {
                        ...item[FIELD_GEOLOCATION],
                        lat: e.target.value && Number(e.target.value)
                      })
                    }
                  />
                  <TextField
                    type="number"
                    disabled={!!item[FIELD_ADDRESS]}
                    data-test="longitude"
                    placeholder="Longitude"
                    value={get(coordinates, 'lng', '')}
                    onChange={(e) =>
                      onLocationChangeHandler(null, {
                        ...item[FIELD_GEOLOCATION],
                        lon: e.target.value && Number(e.target.value)
                      })
                    }
                  />
                </LatLonWrapper>
              </AddressBlock>
            )}
            <MapWrapper>
              {shouldRenderMap ? (
                <LazyLoad height="500px" once>
                  <Suspense fallback={<Skeleton height="500px" />}>
                    <BlurInTransition>
                      <Map
                        coordinates={coordinates}
                        polygon={polygon}
                        locationInfo={locationInfo}
                      />
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
        </Fragment>
      )
    }
  }

  return <div>{components.map((name, i) => componentsRenderingMap[name](i))}</div>
}

export default OfferVisualisation
