import React, { Fragment } from 'react'
import ExpansionPanelWrapper from 'components/ExpansionPanel'
import DraggableGallery from 'components/DraggableGallery'
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
import { COLORS } from '@tourlane/tourlane-ui'

// Fake data to test components
const descriptions = [
  { title: 'Health', description: 'Some descriptions about health' },
  { title: 'Stuff 2', description: 'Some descriptions about stuff 2' },
  { title: 'Stuff 3', description: 'Some descriptions about stuff 3' },
  { title: 'Insurance', description: 'Some descriptions about insurance' },
  { title: 'Money', description: 'Some descriptions about money' }
]
const coordinates = { lat: 50.4520886, lng: 30.590911000000006 }
const locationInfo = {
  name: 'Some address',
  info: 'Some description'
}
// END of fake data

/**
 * This is the GlobalInformation Tab component
 * Use it to render GlobalInformation tab
 *
 * @name GlobalInformation
 * @param {Object} item (current item)
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange (on item change)
 * @param {Array<String>} components (order of components as a STRING to render)
 * @returns {Object} GlobalInformation Tab Component
 */
const GlobalInformation = ({ item, isEditing, onChange, components }) => {
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
            <p>Description</p>
            {isEditing ? (
              <RichTextEditor
                placeholder={`Please write something about the accommodation.\nIn case you are using external copy (WETU) please mark it as such!`}
                value={item.description}
                onChange={onDescriptionUpdate}
              />
            ) : (
              <ShowMore collapsed={true} height={'350px'} size={'20px'} lines={12}>
                {ReactHtmlParser(item.description)}
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
            <p>Rooms</p>
            {item.rooms && item.rooms.length > 0 ? (
              item.rooms.map((room, i) => {
                return (
                  <SearchItemWrapper key={i} p={0} direction={'ttb'}>
                    <ItemTitle p={0} direction={'ltr'} alignItems={'center'}>
                      <span>{room.title}</span>
                      <StyledItemBadge color={COLORS.SENSATION_WHITE}>
                        <span>MB INFO</span>
                      </StyledItemBadge>
                    </ItemTitle>
                    <ItemDescription>
                      {room.description && (
                        <ShowMore collapsed={true} height={'70px'} lines={3}>
                          {room.description}
                        </ShowMore>
                      )}
                    </ItemDescription>
                  </SearchItemWrapper>
                )
              })
            ) : (
              <SearchItemWrapper p={0} direction={'ttb'}>
                <p>No rooms available</p>
              </SearchItemWrapper>
            )}
          </TitleWithContent>
        </Fragment>
      )
    },
    [IMAGES_COMPONENT_NAME]: key => {
      const onImagesUpdate = images => {
        onChange('photos', images)
      }

      return (
        <Fragment key={key}>
          <TitleWithContent>
            <p>Images</p>
            <DraggableGallery
              images={item.photos}
              onChange={onImagesUpdate}
              disabled={!isEditing}
            />
          </TitleWithContent>
        </Fragment>
      )
    },
    [INFORMATION_COMPONENT_NAME]: key => {
      return (
        <Fragment key={key}>
          <TitleWithContent>
            <p>Information</p>
          </TitleWithContent>
          <ExpansionPanelWrapper descriptions={descriptions} />
        </Fragment>
      )
    },
    [LOCATION_COMPONENT_NAME]: key => {
      return (
        <Fragment key={key}>
          <TitleWithContent>
            <br />
            <p>Location</p>
            <MapWrapper>
              <Map coordinates={coordinates} locationInfo={locationInfo} />
            </MapWrapper>
          </TitleWithContent>
        </Fragment>
      )
    }
  }

  return <div>{components.map((name, i) => componentsRenderingMap[name](i))}</div>
}

export default GlobalInformation
