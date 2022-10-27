import { lazy, Fragment } from 'react'
import { CountryCodeSelect } from '@tourlane/rooster'
import styled from 'styled-components'

import PhoneIcon from '@tourlane/iconography/Glyphs/Navigation/Phone'
import WarningIcon from '@tourlane/iconography/Glyphs/Notifications/Warning'

import {
  TitleWithContent,
  PhoneWrapper,
  PhoneBlock,
  CountryCodeWrapper,
  SearchItemWrapper
} from './styles'

import {
  DESCRIPTION_COMPONENT_NAME,
  IMAGES_COMPONENT_NAME,
  INFORMATION_COMPONENT_NAME,
  LOCATION_COMPONENT_NAME,
  PHONE_COMPONENT_NAME,
  CATEGORY_AND_RANKING_COMPONENT_NAME,
  SOURCE,
  COUNTRY_PAGE,
  AREA_PAGE
} from '../utils'

import { H4, TextField, FlexContainer, Flex, Base, COLORS, SvgIcon, Box } from '@tourlane/tourlane-ui'
import Information from './Information'
import Images from './Images'

import { FIELD_FRONT_DESK_PHONE } from '../itemParser'
import { Source } from './Source/Source'

const Description = lazy(() => import(/* webpackChunkName: "Description" */ './Description'))
const CountryPage = lazy(() => import(/* webpackChunkName: "CountryPage" */ './CountryPage'))
const AreaPage = lazy(() => import(/* webpackChunkName: "AreaPage" */ './AreaPage'))

const CategoryAndRanking = lazy(() =>
  import(/* webpackChunkName: "CategoryAndRanking" */ './CategoryAndRanking')
)

const PositionedWarningIcon = styled(WarningIcon)`
  position: relative;
  top: 7px;
`

const Location = lazy(() => import(/* webpackChunkName: "Map" */ './Location'))

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
    [COUNTRY_PAGE]: (key) => (
      <CountryPage
        key={key}
        onChange={onChange}
        isEditing={isEditing}
        onImagesAdd={onImagesAdd}
        isLoadingAdditionalInfo={isLoadingAdditionalInfo}
        onGeolocationUpdate={onGeolocationUpdate}
        {...item}
      />
    ),
    [AREA_PAGE]: (key) => (
      <AreaPage key={key} onChange={onChange} isEditing={isEditing} {...item} />
    ),
    [DESCRIPTION_COMPONENT_NAME]: (key) => (
      <Description key={key} onChange={onChange} isEditing={isEditing} {...item} />
    ),
    [CATEGORY_AND_RANKING_COMPONENT_NAME]: (key) => (
      <CategoryAndRanking key={key} isEditing={isEditing} item={item} onChange={onChange} />
    ),

    [IMAGES_COMPONENT_NAME]: (key) => (
      <Images
        key={key}
        isEditing={isEditing}
        item={item}
        onChange={onChange}
        onImagesAdd={onImagesAdd}
      />
    ),

    [INFORMATION_COMPONENT_NAME]: (key) => (
      <Information
        key={key}
        onChange={onChange}
        item={item}
        isEditing={isEditing}
        type={item.type}
      />
    ),
    [PHONE_COMPONENT_NAME]: (key) => {
      console.log(phone)
      const phoneText = phone.dialCode && phone.phoneNumber ? `${phone.dialCode} ${phone.phoneNumber}`: 'No number added'
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
                      onChange={(str) => {
                        if (phone.phoneNumber) {
                          onChange(
                            FIELD_FRONT_DESK_PHONE,
                            str.dialCode + phone.phoneNumber,
                            item[FIELD_FRONT_DESK_PHONE]
                          )
                        }
                      }}
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
              <Box>
                <Base color={!phone.isValid && COLORS.CHEERFUL_ORANGE}>{phoneText}</Base>
                {!phone.isValid && <Flex alignItems="baseline" gap={14} mt={8}>
                  <SvgIcon size={20} color={COLORS.CHEERFUL_ORANGE} colorActive={COLORS.RIOJA_RED}>
                    <PositionedWarningIcon />
                  </SvgIcon>

                  <Base color={COLORS.CHEERFUL_ORANGE}>The phone number is not valid, please specify a correct one</Base>
                </Flex>}
              </Box>
            )}
          </TitleWithContent>
        </Fragment>
      )
    },
    [LOCATION_COMPONENT_NAME]: (key) => (
      <Location
        key={key}
        item={item}
        isEditing={isEditing}
        isLoadingAdditionalInfo={isLoadingAdditionalInfo}
        onGeolocationUpdate={onGeolocationUpdate}
      />
    ),
    [SOURCE]: (key) => {
      return (
        <SearchItemWrapper key={key} direction={'ttb'}>
          <Source source={item.source ?? []} />
        </SearchItemWrapper>
      )
    }
  }

  return <div>{components.map((name, i) => componentsRenderingMap[name](i))}</div>
}

export default OfferVisualisation
