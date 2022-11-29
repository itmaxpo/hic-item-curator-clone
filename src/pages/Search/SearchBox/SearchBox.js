import { useState, useCallback, useEffect } from 'react'
import { get, debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'

import {
  Flex,
  FlexContainer,
  COLORS,
  Icon,
  Label,
  Checkbox,
  Container
} from '@tourlane/tourlane-ui'
import TipIcon from '@tourlane/iconography/Glyphs/Other/Tip'
import { getSuppliers } from 'services/configurationsApi'
import { usePromise } from 'utils/usePromise'

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
import {
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  ACTIVITY_ITEM_TYPE
} from 'utils/constants'
import { getCountries, getAreasInCountry } from 'services/searchApi'

/**
 * This is the Search Box component,
 * here the user specifies the item search criteria
 *
 * @name SearchBox
 * @returns {Object} Search Box
 */
const SearchBox = ({
  search,
  locationQuery,
  onQueryUpdate,
  onFilterByMissingGeolocation,
  onFilterByBlocklist,
  setCategory,
  isLoading
}) => {
  // Default values for state are coming from location query
  const category = get(locationQuery, 'type')
  const country = getQueryValue(locationQuery, 'countryName', 'countryId')
  const area = getQueryValue(locationQuery, 'areaName', 'areaId')
  const supplier = getQueryValue(locationQuery, 'supplier', 'supplier')
  const name = get(locationQuery, 'name')
  const provider = get(locationQuery, 'provider')
  const missingGeolocation = get(locationQuery, 'missingGeolocation') === 'true'
  const blocked = get(locationQuery, 'blocked') === 'true'
  const navigate = useNavigate()

  const [goToDestination, setGoToDestination] = useState(undefined)
  const [{ data: suppliers = [] }] = usePromise(
    async () =>
      (await getSuppliers()).map(({ name, supplier_id }) => ({ value: supplier_id, label: name })),
    []
  )

  const onNameChange = (e) => {
    const value = e?.target?.value
    const keyCode = e?.keyCode

    onQueryUpdate({
      ...locationQuery,
      name: value
    })

    // Execute search if enter pressed
    if (keyCode === 13) {
      onSearchClick()
    }
  }

  const onCategoryCardClick = (value) => () => {
    setCategory(value)
    onQueryUpdate({ ...locationQuery, type: value })
  }

  const onCountryChange = (value) => {
    onQueryUpdate({
      ...locationQuery,
      countryId: get(value, 'value'),
      countryName: get(value, 'label'),
      areaId: '',
      areaName: ''
    })
  }

  const onSupplierChange = (value) => {
    onQueryUpdate({
      ...locationQuery,
      supplier: get(value, 'value')
    })
  }

  const onProviderChange = (e) => {
    const value = e?.target?.value

    onQueryUpdate({
      ...locationQuery,
      provider: value
    })
  }

  const onAreaChange = (value) => {
    onQueryUpdate({
      ...locationQuery,
      areaId: get(value, 'value'),
      areaName: get(value, 'label')
    })
  }

  const debouncedOnNameChange = debounce(onNameChange, 300)
  const debouncedOnProviderChange = debounce(onProviderChange, 300)

  const onSearchClick = async () => {
    if (!goToDestination) {
      // set search results
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
              missingGeolocation,
              blocked
            },
            0,
            true,
            0
          )
          break
        default:
          return
      }
    } else {
      // go to item page
      const itemId = get(area, 'value') || get(country, 'value')
      navigate(`/item/${itemId}?language=en-GB`)
    }
  }

  const countrySearch = useCallback(
    (value) => getCountries(value.toLowerCase()).then(({ data }) => parseSearchResponse(data)),
    []
  )
  const areaSearch = useCallback(
    (value) =>
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
          {(category === ACCOMMODATION_ITEM_TYPE || category === ACTIVITY_ITEM_TYPE) && (
            <Dropdown
              dataTest="supplier-dropdown"
              label="Supplier"
              placeholder="Name of the supplier"
              value={supplier}
              options={suppliers}
              onChange={onSupplierChange}
            />
          )}
          <AreaDropdown
            hidden={category === COUNTRY_ITEM_TYPE || category === ACTIVITY_ITEM_TYPE}
          />
          {category === ACCOMMODATION_ITEM_TYPE && (
            <NameField
              label="Name (optional)"
              placeholder="Name of the place"
              defaultValue={name}
              // listening to keyDown to capture "enter" to execute search
              onKeyDown={(event) => {
                // since React pools all events for perf optimization,
                // we can only access event specific properties asynchronously by persisting event using event.persist()
                event.persist()
                debouncedOnNameChange(event)
              }}
            />
          )}
          {category === ACTIVITY_ITEM_TYPE && (
            <FlexContainer p={0} mt={1}>
              <NameField
                label="Name"
                placeholder="Name of the activity"
                data-test="name-search"
                defaultValue={name}
                // listening to keyDown to capture "enter" to execute search
                onKeyDown={(event) => {
                  // since React pools all events for perf optimization,
                  // we can only access event specific properties asynchronously by persisting event using event.persist()
                  event.persist()
                  debouncedOnNameChange(event)
                }}
              />
              <Container p={0} ml={1}>
                <NameField
                  label="Provider"
                  placeholder="Provider of the activity"
                  defaultValue={provider}
                  data-test="provider-search"
                  // listening to keyDown to capture "enter" to execute search
                  onKeyDown={(event) => {
                    // since React pools all events for perf optimization,
                    // we can only access event specific properties asynchronously by persisting event using event.persist()
                    event.persist()
                    debouncedOnProviderChange(event)
                  }}
                />
              </Container>
            </FlexContainer>
          )}
        </SearchFieldsWrapper>
      )}
      {category === ACCOMMODATION_ITEM_TYPE && (
        <FlexContainer p={0} pb={1.5} alignSelf="center">
          <Flex>
            <Label>
              <Checkbox
                defaultChecked={missingGeolocation}
                onChange={(e) => {
                  onFilterByMissingGeolocation(e.target.checked)
                }}
              />
              Filter by missing geolocation
            </Label>
          </Flex>
          <FlexContainer p={0} pl={1.4} alignSelf="center">
            <Label>
              <Checkbox
                defaultChecked={blocked}
                onChange={(e) => {
                  onFilterByBlocklist(e.target.checked)
                }}
              />
              Filter by blocked accommodations
            </Label>
          </FlexContainer>
        </FlexContainer>
      )}

      {category !== ACTIVITY_ITEM_TYPE && (
        <SearchWrapper p={0} alignItems={'center'} justify="between">
          <Search
            data-test="search"
            isLoading={isLoading}
            disabled={!country && !supplier}
            destination={goToDestination}
            onButtonClick={onSearchClick}
          />
        </SearchWrapper>
      )}
    </SearchBoxWrapper>
  )
}

export default SearchBox
