import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react'
import { get } from 'lodash'
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
import { getCategoryBasedBehavior } from './utils'
import { categoryCardsMap } from './categoryCardsMap'
import IconCard from 'components/IconCard'

const mockOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'coconut', label: 'Coconut' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'cashew', label: 'Cashew' },
  { value: 'cinnamon', label: 'Cinnamon' }
]

const AccommodationSearchFields = ({ area, onAreaChange, onChange }) => (
  <Fragment>
    <Dropdown
      label={'Area'}
      placeholder="Please select ..."
      options={mockOptions}
      value={area}
      onChange={value => onAreaChange(value)}
    />
    <NameField
      label="Name (optional)"
      placeholder="Name of the place"
      onChange={e => onChange({ name: e.target.value })}
    />
    <Dropdown
      label="Supplier (optional)"
      placeholder="Name of supplier"
      options={mockOptions}
      onChange={value => onChange({ supplier: value })}
    />
  </Fragment>
)

const initialValues = {
  name: undefined,
  supplier: undefined
}

/**
 * This is the Search Box component,
 * here the user specifies the item search criteria
 *
 * @name SearchBox
 * @returns {Object} Search Box
 */
const SearchBox = () => {
  const values = useRef(initialValues)
  const [category, setCategory] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [area, setArea] = useState(undefined)
  const [searchDisabled, setSearchDisabled] = useState(true)
  const [goToDestination, setGoToDestination] = useState(undefined)

  const onValueChange = newValue => {
    values.current = { ...values.current, ...newValue }
  }

  const onCategoryCardClick = value => () => {
    setCategory(value)
  }

  const getCategorySearchFields = useCallback(() => {
    switch (category) {
      case 'area':
        return (
          <Dropdown
            label={'Area (optional)'}
            placeholder="Please select ..."
            options={mockOptions}
            value={area}
            onChange={value => setArea(value)}
          />
        )
      case 'accommodation':
        return (
          <AccommodationSearchFields onChange={onValueChange} area={area} onAreaChange={setArea} />
        )
      default:
        return null
    }
  }, [category, area])

  // effect to clear area when country changes
  useEffect(() => {
    setArea(null)
  }, [country])

  // effect to enable/disable search button & get Go To destination
  useEffect(() => {
    const { shouldDisableSearchButton, getGoToDestination } = getCategoryBasedBehavior(
      category,
      get(country, 'label'),
      get(area, 'label')
    )

    setSearchDisabled(shouldDisableSearchButton)
    setGoToDestination(getGoToDestination)
  }, [category, country, area])

  return (
    <SearchBoxWrapper>
      <SearchBoxTitle>What item are you looking for?</SearchBoxTitle>
      <CategoryCardsWrapper justify="between" p={0} pt={1} pb={1.5}>
        {categoryCardsMap.map(({ value, icon }) => (
          <IconCard
            key={value}
            label={value}
            icon={icon}
            selected={category === value}
            onClick={onCategoryCardClick(value)}
          />
        ))}
      </CategoryCardsWrapper>
      {category && (
        <SearchFieldsWrapper p={0} pb={1.5} wrap justify="between">
          <Dropdown
            label="Country"
            placeholder="Please select ..."
            options={mockOptions}
            renderMarginRight={category !== 'country'}
            renderMarginBottom={category === 'accommodation'}
            value={country}
            onChange={value => setCountry(value)}
          />
          {getCategorySearchFields()}
        </SearchFieldsWrapper>
      )}
      <SearchWrapper p={0} justify="between">
        <Search disabled={searchDisabled} destination={goToDestination} />
      </SearchWrapper>
    </SearchBoxWrapper>
  )
}

export default SearchBox
