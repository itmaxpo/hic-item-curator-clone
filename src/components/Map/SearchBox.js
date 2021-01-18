import React from 'react'
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

const addressSearch = debounce((input, callback) => {
  searchAddress(input).then((response) => callback(parseSearchBoxResponse(response)))
}, 1000)

const SearchBox = ({ placeholder = 'Type to find', disabled, ...props }) => (
  <DropdownSelect
    isAsync
    isClearable
    cacheOptions
    placeholder={placeholder}
    openMenuOnClick={false}
    loadOptions={addressSearch}
    isDisabled={disabled}
    {...props}
  />
)

export default SearchBox
