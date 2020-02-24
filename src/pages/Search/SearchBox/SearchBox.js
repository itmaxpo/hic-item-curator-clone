import React, { useState, useCallback, useEffect, useContext } from 'react'
import { get, debounce } from 'lodash'
import { FlexContainer, COLORS, Icon, Label, Checkbox } from '@tourlane/tourlane-ui'
import TipIcon from '@tourlane/iconography/Glyphs/Other/Tip'
import {
  SearchBoxWrapper,
  SearchBoxTitle,
  Dropdown,
  NameField,
  CategoryCardsWrapper,
  Search,
  SearchWrapper,
  SearchFieldsWrapper,
  StyledBase
} from './styles'
import { getGoToDestination, parseSearchResponse, getQueryValue } from './utils'
import { categoryCardsMap } from './categoryCardsMap'
import IconCard from 'components/IconCard'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { getCountries, getAreasInCountry } from 'services/searchApi'
import SuppliersContext from 'contexts/Suppliers'

/**
 * This is the Search Box component,
 * here the user specifies the item search criteria
 *
 * @name SearchBox
 * @param {Object} history
 * @returns {Object} Search Box
 */
const SearchBox = ({
  history,
  search,
  locationQuery,
  onQueryUpdate,
  onFilterByMissingGeolocation
}) => {
  // Default values for state are coming from location query
  const category = get(locationQuery, 'type')
  const country = getQueryValue(locationQuery, 'countryName', 'countryId')
  const area = getQueryValue(locationQuery, 'areaName', 'areaId')
  const supplier = getQueryValue(locationQuery, 'supplier', 'supplier')
  const name = get(locationQuery, 'name')
  const missingGeolocation = get(locationQuery, 'missingGeolocation') === 'true'

  const [goToDestination, setGoToDestination] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { suppliers } = useContext(SuppliersContext)

  const onNameChange = value => {
    onQueryUpdate({
      ...locationQuery,
      name: value
    })
  }

  const debouncedOnNameChange = debounce(onNameChange, 300)

  const onCategoryCardClick = value => () => {
    onQueryUpdate({ ...locationQuery, type: value })
  }

  const onCountryChange = value => {
    onQueryUpdate({
      ...locationQuery,
      countryId: get(value, 'value'),
      countryName: get(value, 'label'),
      areaId: '',
      areaName: ''
    })
  }

  const onSupplierChange = value => {
    onQueryUpdate({
      ...locationQuery,
      supplier: get(value, 'value')
    })
  }

  const onAreaChange = value => {
    onQueryUpdate({
      ...locationQuery,
      areaId: get(value, 'value'),
      areaName: get(value, 'label')
    })
  }

  const onSearchClick = async () => {
    if (!goToDestination) {
      // set search results
      setIsLoading(true)
      switch (category) {
        case AREA_ITEM_TYPE:
          await search({ country: country.value }, 0, true)
          break
        case ACCOMMODATION_ITEM_TYPE:
          await search(
            {
              country: get(country, 'value'),
              supplier: get(supplier, 'value'),
              area: get(area, 'value'),
              name,
              missingGeolocation
            },
            0,
            true
          )
          break
        default:
          return
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
    } else {
      // go to item page
      const itemId = get(area, 'value') || get(country, 'value')
      history.push(`/item/${itemId}?language=en-GB`)
    }
  }

  const countrySearch = useCallback(
    value => getCountries(value.toLowerCase()).then(({ data }) => parseSearchResponse(data)),
    []
  )
  const areaSearch = useCallback(
    value =>
      getAreasInCountry({ name: value.toLowerCase(), country: country.value }).then(({ data }) =>
        parseSearchResponse(data)
      ),
    [country]
  )

  const AreaDropdown = ({ hidden }) => (
    <Dropdown
      dataTest="area-dropdown"
      hidden={hidden}
      isAsync
      isClearable
      cacheOptions
      label={'Area (optional)'}
      isDisabled={!country}
      placeholder="Type to find"
      openMenuOnClick={false}
      loadOptions={areaSearch}
      onChange={onAreaChange}
      value={area}
    />
  )

  // effect to get Go To destination
  useEffect(() => {
    setGoToDestination(getGoToDestination(category, get(country, 'label'), get(area, 'label')))
  }, [category, country, area])

  return (
    <SearchBoxWrapper data-test="searchBox">
      <SearchBoxTitle>What item are you looking for?</SearchBoxTitle>
      <CategoryCardsWrapper justify="between" p={0} pt={1} pb={1.5}>
        {categoryCardsMap.map(({ value, displayName, icon }) => (
          <IconCard
            key={value}
            data-test={displayName}
            value={value}
            label={displayName}
            icon={icon}
            selected={category === value}
            onClick={onCategoryCardClick(value)}
          />
        ))}
      </CategoryCardsWrapper>
      {category && (
        <SearchFieldsWrapper p={0} pb={1.5} wrap justify="between">
          {category === ACCOMMODATION_ITEM_TYPE && (
            <FlexContainer p={0} mb={1} fullWidth justify="center" alignItems="center">
              <Icon as={TipIcon} size={20} color={COLORS.ELEMENT_GRAY} />
              <StyledBase>Please select the country, supplier or both to search</StyledBase>
            </FlexContainer>
          )}
          <Dropdown
            dataTest="country-dropdown"
            isAsync
            isClearable
            cacheOptions
            value={country}
            label="Country"
            placeholder="Type to find"
            openMenuOnClick={false}
            loadOptions={countrySearch}
            renderMarginRight={category !== COUNTRY_ITEM_TYPE}
            renderMarginBottom={category === ACCOMMODATION_ITEM_TYPE}
            onChange={onCountryChange}
          />
          {category === ACCOMMODATION_ITEM_TYPE && (
            <Dropdown
              dataTest="supplier-dropdown"
              label="Supplier"
              placeholder="Name of the supplier"
              value={supplier}
              options={suppliers}
              onChange={onSupplierChange}
            />
          )}
          <AreaDropdown hidden={category === COUNTRY_ITEM_TYPE} />
          {category === ACCOMMODATION_ITEM_TYPE && (
            <NameField
              label="Name (optional)"
              placeholder="Name of the place"
              defaultValue={name}
              onChange={e => {
                debouncedOnNameChange(e.target.value)
              }}
            />
          )}
        </SearchFieldsWrapper>
      )}
      {category === ACCOMMODATION_ITEM_TYPE && (
        <FlexContainer p={0} pb={1.5} alignSelf="center">
          <Label>
            <Checkbox
              defaultChecked={missingGeolocation}
              onChange={e => {
                onFilterByMissingGeolocation(e.target.checked)
              }}
            />
            Filter by missing geolocation
          </Label>
        </FlexContainer>
      )}
      <SearchWrapper p={0} alignItems={'center'} justify="between">
        <Search
          data-test="search"
          isLoading={isLoading}
          disabled={!country && !supplier}
          destination={goToDestination}
          onButtonClick={onSearchClick}
        />
      </SearchWrapper>
    </SearchBoxWrapper>
  )
}

export default SearchBox
