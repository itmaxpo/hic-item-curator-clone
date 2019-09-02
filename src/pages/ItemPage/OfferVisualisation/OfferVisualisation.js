import React, { Fragment } from 'react'
import { isEmpty, flatten } from 'lodash'
import ExpansionPanelWrapper from 'components/ExpansionPanel'
import Map from 'components/Map'
import RichTextEditor from 'components/RichTextEditor'
import ReactHtmlParser from 'react-html-parser'
import ShowMore from 'components/ShowMore'
import {
  TitleWithContent,
  MapWrapper,
  SearchItemWrapper,
  ItemTitle,
  ItemDescription,
  StyledItemBadge
} from './styles'
import {
  DESCRIPTION_COMPONENT_NAME,
  IMAGES_COMPONENT_NAME,
  INFORMATION_COMPONENT_NAME,
  LOCATION_COMPONENT_NAME,
  ROOMS_COMPONENT_NAME
} from '../utils'
import { COLORS, H4 } from '@tourlane/tourlane-ui'
import ImageUploader from 'components/ImageUploader'

// Fake data to test components
const descriptions = [
  { title: 'Health', description: 'Some descriptions about health' },
  { title: 'Stuff 2', description: 'Some descriptions about stuff 2' },
  { title: 'Stuff 3', description: 'Some descriptions about stuff 3' },
  { title: 'Insurance', description: 'Some descriptions about insurance' },
  { title: 'Money', description: 'Some descriptions about money' }
]
// END of fake data

/**
 * This is the OfferVisualisation Tab component
 * Use it to render OfferVisualisation tab
 *
 * @name OfferVisualisation
 * @param {String} itemId
 * @param {Object} offerVisualisation (current offerVisualisation)
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange (on offerVisualisation change)
 * @param {Array<String>} components (order of components as a STRING to render)
 * @returns {Object} GlobalInformation Tab Component
 */
const OfferVisualisation = ({ itemId, offerVisualisation, isEditing, onChange, components }) => {
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
                placeholder={`Please write something about the accommodation.\nIn case you are using external copy (WETU) please mark it as such!`}
                value={offerVisualisation.description}
                onChange={onDescriptionUpdate}
              />
            ) : (
              <ShowMore collapsed={true} height={'350px'} size={'20px'} lines={12}>
                {!isEmpty(offerVisualisation.description)
                  ? ReactHtmlParser(offerVisualisation.description)
                  : 'No description'}
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
            {offerVisualisation.rooms && offerVisualisation.rooms.length > 0 ? (
              offerVisualisation.rooms.map((room, i, arr) => {
                return (
                  <SearchItemWrapper key={i} p={0} direction={'ttb'}>
                    <ItemTitle p={0} direction={'ltr'} alignItems={'center'}>
                      <span>{room.name}</span>
                      {room.mealbase && (
                        <StyledItemBadge color={COLORS.SENSATION_WHITE}>
                          <span>{room.mealbase}</span>
                        </StyledItemBadge>
                      )}
                    </ItemTitle>

                    <ItemDescription>
                      {room.description && (
                        <ShowMore collapsed={true} height={'70px'} lines={3}>
                          {ReactHtmlParser(room.description)}
                        </ShowMore>
                      )}
                    </ItemDescription>
                  </SearchItemWrapper>
                )
              })
            ) : (
              <SearchItemWrapper p={0} direction={'ttb'}>
                <H4>No rooms available</H4>
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
              itemId={itemId}
              images={offerVisualisation.photos}
              onImagesUpdate={images => onChange('photos', images)}
            />
          </TitleWithContent>
        </Fragment>
      )
    },
    [INFORMATION_COMPONENT_NAME]: key => {
      return (
        <Fragment key={key}>
          <TitleWithContent>
            <H4>Information</H4>
          </TitleWithContent>
          <ExpansionPanelWrapper descriptions={descriptions} />
        </Fragment>
      )
    },
    [LOCATION_COMPONENT_NAME]: key => {
      const polygon = flatten(offerVisualisation.polygon).map(coordinate => ({
        lat: coordinate[1],
        lng: coordinate[0]
      }))
      // Here we will render goordinates for accommodations
      // But for Area (polygon) we will take first geolocation
      const coordinates = offerVisualisation.coordinates || polygon[0]

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <br />
            <H4>Location</H4>
            <MapWrapper>
              {coordinates && <Map coordinates={coordinates} polygon={polygon} />}
            </MapWrapper>
          </TitleWithContent>
        </Fragment>
      )
    }
  }

  return <div>{components.map((name, i) => componentsRenderingMap[name](i))}</div>
}

export default OfferVisualisation
