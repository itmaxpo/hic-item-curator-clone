import React, { useCallback } from 'react'
import { debounce } from 'lodash'
import { DropdownSelect } from '@tourlane/tourlane-ui'
import { searchAddress } from 'services/addressApi'
import { parseSearchBoxResponse } from './utils'

/**
 * SearchBox component
 * Renders an input field to search for locations using OSM Api
 *
 * @name SearchBox
 * @param {String} className
 * @param {String} placeholder
 * @param {Function} onChange
 * @returns {Object} SearchBox Component
 */

const addressSearch = (input, callback) => {
  searchAddress(input).then(response => callback(parseSearchBoxResponse(response)))
}

const SearchBox = ({
  className,
  placeholder = 'Type to find',
  onChange = () => {},
  defaultValue
}) => {
  const onChangeHandler = value => {
    onChange(value)
  }

  // usage policy states an absolute maximum of 1 request per second
  // https://operations.osmfoundation.org/policies/nominatim/
  const debouncedAddressSearch = useCallback(debounce(addressSearch, 1000), [])

  return (
    <DropdownSelect
      className={className}
      isAsync
      isClearable
      cacheOptions
      placeholder={placeholder}
      openMenuOnClick={false}
      loadOptions={debouncedAddressSearch}
      onChange={onChangeHandler}
      defaultValue={defaultValue}
    />
  )
}

export default SearchBox
