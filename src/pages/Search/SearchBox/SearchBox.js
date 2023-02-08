import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Flex, COLORS, Icon, Label, Checkbox } from '@tourlane/tourlane-ui'
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
  SearchFieldsWrapper,
  StyledBase,
  Form
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
import { getCountries, searchAreas } from 'services/searchApi'

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
  const category = locationQuery?.type
  const country = getQueryValue(locationQuery, 'countryName', 'countryId')
  const area = getQueryValue(locationQuery, 'areaName', 'areaId')
  const name = locationQuery?.name
  const provider = locationQuery?.provider
  const missingGeolocation = locationQuery?.missingGeolocation === 'true'
  const blocked = locationQuery?.blocked === 'true'
  const navigate = useNavigate()
  const [goToDestination, setGoToDestination] = useState(undefined)
  const [{ data: suppliers = [] }] = usePromise(
    async () => (await getSuppliers()).map(({ name, uuid }) => ({ value: uuid, label: name })),
    []
  )

  const onNameChange = (e) => {
    const value = e?.target?.value

    onQueryUpdate({
      ...locationQuery,
      name: value
    })
  }

  const onCategoryCardClick = (value) => () => {
    setCategory(value)
    onQueryUpdate({ ...locationQuery, type: value })
  }

  const onCountryChange = (value) => {
    onQueryUpdate({
      ...locationQuery,
      countryId: value?.value,
      countryName: value?.label,
      areaId: '',
      areaName: ''
    })
  }

  const onSupplierChange = (value) => {
    onQueryUpdate({
      ...locationQuery,
      supplier: value?.value
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
      areaId: value?.value,
      areaName: value?.label
    })
  }

  const onSearchClick = async (event) => {
    event.preventDefault()
    if (!goToDestination) {
      // set search results
      switch (category) {
        case AREA_ITEM_TYPE:
          await search({ country: country.value }, 0, true)
          break
        case ACCOMMODATION_ITEM_TYPE:
          await search(
            {
              country: country?.value,
              supplier: supplier?.value,
              area: area?.value,
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
      const itemId = area?.value || country?.value
      navigate(`/item/${itemId}?language=en-GB`)
    }
  }

  const countrySearch = useCallback(
    (value) =>
      getCountries({ name: value.toLowerCase() }).then((data) => parseSearchResponse(data)),
    []
  )

  const areaSearch = useCallback(
    (value) =>
      searchAreas({ name: value.toLowerCase(), country: country.value }).then(({ data }) =>
        parseSearchResponse(data)
      ),
    [country]
  )
  const supplier = locationQuery?.supplier
    ? {
        label: suppliers.find(({ value }) => value === locationQuery?.supplier)?.label ?? '',
        value: locationQuery?.supplier ?? ''
      }
    : undefined

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
    setGoToDestination(getGoToDestination(category, country?.label, area?.label))
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
      <Form onSubmit={onSearchClick}>
        {category && (
          <SearchFieldsWrapper p={0} pb={1.5} wrap justify="between">
            {category === ACCOMMODATION_ITEM_TYPE && (
              <Flex mb="24px" fullWidth justify="center" alignItems="center">
                <Icon as={TipIcon} size={20} color={COLORS.ELEMENT_GRAY} />
                <StyledBase>Please select the country, supplier or both to search</StyledBase>
              </Flex>
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
                onChange={(event) => {
                  onNameChange(event)
                }}
              />
            )}
            {category === ACTIVITY_ITEM_TYPE && (
              <Flex p={0} mt="24px">
                <NameField
                  label="Name"
                  placeholder="Name of the activity"
                  data-test="name-search"
                  defaultValue={name}
                  // listening to keyDown to capture "enter" to execute search
                  onKeyDown={(event) => {
                    onNameChange(event)
                  }}
                />
                <Flex ml="24px">
                  <NameField
                    label="Provider"
                    placeholder="Provider of the activity"
                    defaultValue={provider}
                    data-test="provider-search"
                    // listening to keyDown to capture "enter" to execute search
                    onKeyDown={(event) => {
                      onProviderChange(event)
                    }}
                  />
                </Flex>
              </Flex>
            )}
          </SearchFieldsWrapper>
        )}
        {category === ACCOMMODATION_ITEM_TYPE && (
          <Flex pb="36px" alignSelf="center" justifyContent="center">
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
            <Flex pl="33px" alignSelf="center" justifyContent="center">
              <Label>
                <Checkbox
                  defaultChecked={blocked}
                  onChange={(e) => {
                    onFilterByBlocklist(e.target.checked)
                  }}
                />
                Filter by blocked accommodations
              </Label>
            </Flex>
          </Flex>
        )}

        {category !== ACTIVITY_ITEM_TYPE && (
          <Flex p={0} alignItems={'center'} justifyContent="center">
            <Search
              data-test="search"
              isLoading={isLoading}
              disabled={!country && !supplier}
              destination={goToDestination}
              type="submit"
            />
          </Flex>
        )}
      </Form>
    </SearchBoxWrapper>
  )
}

export default SearchBox
