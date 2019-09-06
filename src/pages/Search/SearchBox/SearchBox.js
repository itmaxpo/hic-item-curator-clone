import React, { Fragment, useState, useCallback, useEffect, useRef, useContext } from 'react'
import { get, debounce } from 'lodash'
import {
  SearchBoxWrapper,
  SearchBoxTitle,
  Dropdown,
  NameField,
  CategoryCardsWrapper,
  Search,
  SearchWrapper,
  SearchFieldsWrapper
} from './styles'
import { getGoToDestination, parseSearchResponse, getQueryValue } from './utils'
import { categoryCardsMap } from './categoryCardsMap'
import IconCard from 'components/IconCard'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'
import { getCountries, getAreasInCountry } from 'services/searchApi'
import SuppliersContext from 'contexts/Suppliers'

// Start searching after 2 characters typed
const searchCountries = (value, callback) => {
  if (value.length >= 2) {
    getCountries(value.toLowerCase()).then(({ data }) => callback(parseSearchResponse(data)))
  } else {
    callback(parseSearchResponse([]))
  }
}
// Start searching after 3 characters typed
const searchAreas = (value, callback, country) => {
  if (value.length >= 3) {
    getAreasInCountry(value.toLowerCase(), country).then(({ data }) =>
      callback(parseSearchResponse(data))
    )
  } else {
    callback(parseSearchResponse([]))
  }
}

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
  onItemTypeChange,
  onLoadingChange,
  isLoading,
  locationQuery,
  onQueryUpdate
}) => {
  // Default values for state are coming from location query
  const typeFromQuery = get(locationQuery, 'type')
  const countryFromQuery = getQueryValue(locationQuery, 'countryName', 'countryId')
  const areaFromQuery = getQueryValue(locationQuery, 'areaName', 'areaId')
  const supplierFromQuery = getQueryValue(locationQuery, 'supplier', 'supplier')
  const accomNameFromQuery = get(locationQuery, 'name')

  const initialValues = {
    name: accomNameFromQuery,
    supplier: supplierFromQuery
  }

  const values = useRef(initialValues)
  const [category, setCategory] = useState(typeFromQuery)
  const [country, setCountry] = useState(countryFromQuery)
  const [area, setArea] = useState(areaFromQuery)
  const [goToDestination, setGoToDestination] = useState(undefined)

  const { suppliers } = useContext(SuppliersContext)

  const onValueChange = newValue => {
    values.current = { ...values.current, ...newValue }

    onQueryUpdate({
      ...locationQuery,
      ...values.current
    })
  }

  const onCategoryCardClick = value => () => {
    onQueryUpdate({ ...locationQuery, type: value })
    setCategory(value)
    // Send isLoading for SearchResults
    onLoadingChange(false)
  }

  const onCountryChange = value => {
    onQueryUpdate({
      ...locationQuery,
      countryId: get(value, 'value'),
      countryName: get(value, 'label'),
      areaId: '',
      areaName: ''
    })
    setCountry(value)
  }

  const onAreaChange = value => {
    onQueryUpdate({
      ...locationQuery,
      areaId: get(value, 'value'),
      areaName: get(value, 'label')
    })
    setArea(value)
  }

  const onSearchClick = async () => {
    if (!goToDestination) {
      onLoadingChange(true)

      // set search results
      switch (category) {
        case AREA_ITEM_TYPE:
          await search(country.value)
          break
        case ACCOMMODATION_ITEM_TYPE:
          await search({
            country: country.value,
            area: get(area, 'value'),
            ...values.current
          })
          break
        default:
          return
      }

      onLoadingChange(false)
    } else {
      // go to item page
      const itemId = get(area, 'value') || get(country, 'value')
      history.push(`/item/${itemId}`)
    }
  }

  const debouncedCountrySearch = useCallback(debounce(searchCountries, 400), [])
  const debouncedAreaSearch = useCallback(
    debounce((value, callback) => {
      searchAreas(value, callback, get(country, 'value'))
    }, 400),
    [country]
  )

  const AreaDropdown = ({ hidden }) => (
    <Dropdown
      hidden={hidden}
      isAsync
      isClearable
      cacheOptions
      label={'Area (optional)'}
      isDisabled={!country}
      placeholder="Please select ..."
      loadOptions={debouncedAreaSearch}
      onChange={onAreaChange}
      value={area}
    />
  )

  // effect to clear area when country changes
  useEffect(() => {
    // This condition will prevent area value form location query to be null
    // if there is coutry and area already in the query
    if (!locationQuery.areaId) {
      setArea(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country])

  // effect to get Go To destination
  useEffect(() => {
    setGoToDestination(getGoToDestination(category, get(country, 'label'), get(area, 'label')))
  }, [category, country, area])

  // effect to keep parent's item type in sync with category
  useEffect(() => {
    onItemTypeChange(category)
  }, [category, onItemTypeChange])

  return (
    <SearchBoxWrapper>
      <SearchBoxTitle>What item are you looking for?</SearchBoxTitle>
      <CategoryCardsWrapper justify="between" p={0} pt={1} pb={1.5}>
        {categoryCardsMap.map(({ value, displayName, icon }) => (
          <IconCard
            key={value}
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
          <Dropdown
            isAsync
            isClearable
            cacheOptions
            value={country}
            label="Country"
            placeholder="Please select ..."
            loadOptions={debouncedCountrySearch}
            renderMarginRight={category !== COUNTRY_ITEM_TYPE}
            renderMarginBottom={category === ACCOMMODATION_ITEM_TYPE}
            onChange={onCountryChange}
          />
          <AreaDropdown hidden={category === COUNTRY_ITEM_TYPE} />
          {category === ACCOMMODATION_ITEM_TYPE && (
            <Fragment>
              <NameField
                label="Name (optional)"
                placeholder="Name of the place"
                defaultValue={accomNameFromQuery}
                onChange={e => onValueChange({ name: e.target.value })}
              />
              <Dropdown
                label="Supplier tag (optional)"
                placeholder="Name the supplier tag"
                value={supplierFromQuery}
                options={suppliers}
                onChange={value => onValueChange({ supplier: get(value, 'value') })}
              />
            </Fragment>
          )}
        </SearchFieldsWrapper>
      )}
      <SearchWrapper p={0} alignItems={'center'} justify="between">
        <Search
          isLoading={isLoading}
          disabled={!country}
          destination={goToDestination}
          onButtonClick={onSearchClick}
        />
      </SearchWrapper>
    </SearchBoxWrapper>
  )
}

export default SearchBox
