import React, { useState, useCallback, useEffect, useRef } from 'react'
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

const CountrySelect = ({ options = [], onChange = () => {}, value, ...rest }) => (
  <Dropdown
    label="Country"
    placeholder="Please select ..."
    options={mockOptions}
    value={value}
    onChange={value => onChange(value)}
    {...rest}
  />
)
const AreaSelect = ({ options = [], onChange = () => {}, value, isOptional }) => (
  <Dropdown
    label={isOptional ? 'Area (optional)' : 'Area'}
    placeholder="Please select ..."
    options={mockOptions}
    value={value}
    onChange={value => onChange(value)}
  />
)
const SupplierSelect = ({ options = [], onChange = () => {} }) => (
  <Dropdown
    label="Supplier (optional)"
    placeholder="Name of supplier"
    options={mockOptions}
    onChange={value => onChange({ supplier: value })}
  />
)
const NameInput = ({ onChange = () => {} }) => (
  <NameField
    label="Name (optional)"
    placeholder="Name of the place"
    onChange={e => onChange({ name: e.target.value })}
  />
)

const AccommodationSearchFields = ({ area, onAreaChange, ...rest }) => (
  <>
    <AreaSelect value={area} onChange={onAreaChange} />
    <NameInput {...rest} />
    <SupplierSelect {...rest} />
  </>
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
        return <AreaSelect value={area} onChange={setArea} isOptional />
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

  // effect to enable/disable search button
  useEffect(() => {
    switch (category) {
      case 'country':
      case 'area':
        if (country) {
          setSearchDisabled(false)
        } else {
          setSearchDisabled(true)
        }
        break
      case 'accommodation':
        if (area && country) {
          setSearchDisabled(false)
        } else {
          setSearchDisabled(true)
        }
        break
      default:
        setSearchDisabled(true)
        break
    }
  }, [category, country, area])

  // effect to switch from search to "Go to destination"
  useEffect(() => {
    switch (category) {
      case 'country':
        if (country) {
          setGoToDestination(country.label)
        } else {
          setGoToDestination(undefined)
        }
        break
      case 'area':
        if (country && area) {
          setGoToDestination(area.label)
        } else {
          setGoToDestination(undefined)
        }
        break
      default:
        setGoToDestination(undefined)
        break
    }
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
          <CountrySelect
            renderMarginRight={category !== 'country'}
            renderMarginBottom={category === 'accommodation'}
            value={country}
            onChange={setCountry}
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
