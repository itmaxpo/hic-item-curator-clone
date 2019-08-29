import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react'
import { get } from 'lodash'
import { withRouter } from 'react-router-dom'
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
import { getGoToDestination, parseCountriesResponse, parseAreasResponse } from './utils'
import { categoryCardsMap } from './categoryCardsMap'
import IconCard from 'components/IconCard'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'
import { getCountries, getAreasInCountry } from 'services/searchApi'

const initialValues = {
  name: undefined,
  supplier: undefined
}

/**
 * This is the Search Box component,
 * here the user specifies the item search criteria
 *
 * @name SearchBox
 * @param {Object} history
 * @returns {Object} Search Box
 */
const SearchBox = ({ history, search, onItemTypeChange, suppliers }) => {
  const values = useRef(initialValues)
  const [category, setCategory] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [area, setArea] = useState(undefined)
  const [goToDestination, setGoToDestination] = useState(undefined)
  const [progressButtonState, setProgressButtonState] = useState('isButton')

  const onValueChange = newValue => {
    values.current = { ...values.current, ...newValue }
  }

  const onCategoryCardClick = value => () => {
    setCategory(value)
    // setProgressButtonState('isComplete')
  }

  const onSearchClick = async () => {
    if (!goToDestination) {
      setProgressButtonState('isLoading')
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
      setProgressButtonState('isComplete')
    } else {
      // go to item page
      const itemId = get(area, 'value') || get(country, 'value')
      history.push(`/item/${itemId}`)
    }
  }

  const searchCountries = useCallback(async value => {
    const criteria = value.toLowerCase()

    if (criteria.length >= 2) {
      const { data } = await getCountries(criteria)

      return parseCountriesResponse(data)
    }
  }, [])

  const searchAreas = useCallback(
    async value => {
      const criteria = value.toLowerCase()

      if (criteria.length >= 2) {
        const { data } = await getAreasInCountry(criteria, country.value)
        return parseAreasResponse(data)
      }
    },
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
      loadOptions={searchAreas}
      onChange={value => setArea(value)}
      value={area}
    />
  )

  // effect to clear area when country changes
  useEffect(() => {
    setArea(null)
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
            label="Country"
            placeholder="Please select ..."
            loadOptions={searchCountries}
            renderMarginRight={category !== COUNTRY_ITEM_TYPE}
            renderMarginBottom={category === ACCOMMODATION_ITEM_TYPE}
            onChange={value => setCountry(value)}
          />
          <AreaDropdown hidden={category === COUNTRY_ITEM_TYPE} />
          {category === ACCOMMODATION_ITEM_TYPE && (
            <Fragment>
              <NameField
                label="Name (optional)"
                placeholder="Name of the place"
                onChange={e => onValueChange({ name: e.target.value })}
              />
              <Dropdown
                label="Supplier (optional)"
                placeholder="Name of supplier"
                options={suppliers}
                onChange={value => onValueChange({ supplier: get(value, 'value') })}
              />
            </Fragment>
          )}
        </SearchFieldsWrapper>
      )}
      <SearchWrapper p={0} justify="between">
        <Search
          state={progressButtonState}
          disabled={!country}
          destination={goToDestination}
          onButtonClick={onSearchClick}
        />
      </SearchWrapper>
    </SearchBoxWrapper>
  )
}

export default withRouter(SearchBox)
