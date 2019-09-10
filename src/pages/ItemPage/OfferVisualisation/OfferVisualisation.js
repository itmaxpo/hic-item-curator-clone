import React, { Fragment } from 'react'
import { isEmpty, flatten } from 'lodash'
import ExpansionPanelWrapper from 'components/ExpansionPanel'
import Map from 'components/Map'
import RichTextEditor from 'components/RichTextEditor'
import ReactHtmlParser from 'react-html-parser'
import ShowMore from 'components/ShowMore'
import Loader from 'components/Loader'
import { TitleWithContent, MapWrapper, SearchItemWrapper, StyledRichTextEditor } from './styles'
import {
  DESCRIPTION_COMPONENT_NAME,
  IMAGES_COMPONENT_NAME,
  INFORMATION_COMPONENT_NAME,
  LOCATION_COMPONENT_NAME,
  ROOMS_COMPONENT_NAME
} from '../utils'
import { H4 } from '@tourlane/tourlane-ui'
import ImageUploader from 'components/ImageUploader'
import { itemSpecificFields } from '../itemParser'
import { capitalize } from 'pages/Search/utils'
import { StyledHeader } from 'components/ExpansionPanel/styles'

// Fake data to test components
const descriptions = item => {
  // active_destination ==> 'Active destination'
  const parseCountryFieldName = fieldName => capitalize(fieldName.split('_').join(' '))

  return itemSpecificFields[item.type]
    .filter(f => f !== 'active_destination')
    .sort()
    .map(field => ({
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
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange
 * @param {Array<String>} components (order of components as a STRING to render)
 * @returns {Object} GlobalInformation Tab Component
 */
const OfferVisualisation = ({ item, isEditing, onChange, components, isLoadingAdditionalInfo }) => {
  // Based on the provided array of strings, that describes which component to render
  // This map returns:
  //    - necessary component to render
  //    - is handling isEditing state changes
  //    - uses onChange to send updated property to ItemPage
  //
  // This map always receives:
  //    - <key> to provide a specific key for every element to render them properly
  //
  // There can be 2 different types of logic:
  //  1) You can handle isEditing state changes as two separate components (e.g. DESCRIPTION (lines 58-77))
  //  2) Component can handle isEditing state (e.g. IMAGES (lines 112-128))
  const componentsRenderingMap = {
    [DESCRIPTION_COMPONENT_NAME]: key => {
      const onDescriptionUpdate = description => {
        onChange('description', description)
      }

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4>Description</H4>
            {isEditing ? (
              <RichTextEditor
                placeholder={`Please write something about the ${item.type}`}
                value={item.description}
                onChange={onDescriptionUpdate}
              />
            ) : (
              <ShowMore collapsed={true} height={'350px'} size={'20px'} lines={12}>
                {!isEmpty(item.description) ? ReactHtmlParser(item.description) : 'No description'}
              </ShowMore>
            )}
          </TitleWithContent>
        </Fragment>
      )
    },
    [ROOMS_COMPONENT_NAME]: key => {
      return (
        <Fragment key={key}>
          <TitleWithContent withoutPadding>
            <H4>Rooms</H4>
            {isLoadingAdditionalInfo && <Loader top={'45%'} />}

            {item.rooms && item.rooms.length > 0 ? (
              <ExpansionPanelWrapper descriptions={item.rooms} />
            ) : (
              <SearchItemWrapper p={0} direction={'ttb'}>
                No rooms available
              </SearchItemWrapper>
            )}
          </TitleWithContent>
        </Fragment>
      )
    },
    [IMAGES_COMPONENT_NAME]: key => {
      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4>Images</H4>
            <ImageUploader
              isEditing={isEditing}
              itemId={item.id}
              images={item.photos}
              onImagesUpdate={images => onChange('photos', images)}
            />
          </TitleWithContent>
        </Fragment>
      )
    },
    [INFORMATION_COMPONENT_NAME]: key => {
      const parsedDescriptions = descriptions(item)

      const countryFieldDescriptionUpdate = (description, field) => {
        onChange(field, description)
      }

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4>Information</H4>
          </TitleWithContent>
          {isEditing ? (
            <>
              {parsedDescriptions.map((desc, i) => (
                <Fragment key={i}>
                  <StyledHeader>{desc.label}</StyledHeader>
                  <StyledRichTextEditor
                    key={i}
                    placeholder={`Please write something about the ${desc.label.toLowerCase()}`}
                    value={desc.value}
                    onChange={val => countryFieldDescriptionUpdate(val, desc.field)}
                  />
                </Fragment>
              ))}
            </>
          ) : (
            <ExpansionPanelWrapper descriptions={parsedDescriptions} />
          )}
        </Fragment>
      )
    },
    [LOCATION_COMPONENT_NAME]: key => {
      const polygon = flatten(item.polygon).map(coordinate => ({
        lat: coordinate[1],
        lng: coordinate[0]
      }))
      // Here we will render goordinates for accommodations
      // But for Area (polygon) we will take first geolocation
      const coordinates = item.coordinates || polygon[0]

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <br />
            <H4>Location</H4>
            <MapWrapper>
              {coordinates && <Map coordinates={coordinates} polygon={polygon} />}
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
