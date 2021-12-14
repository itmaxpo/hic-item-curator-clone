import React from 'react'
import { debounce } from 'lodash'
import { DropdownSelect, FormItem, DropdownSelectProps } from '@tourlane/tourlane-ui'
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

interface Props {
  placeholder?: string
  disabled?: boolean
  defaultInputValue?: string
  error: string
  onChange: (...args: any[]) => void
  value: any
}

const SearchBox = React.forwardRef<any, DropdownSelectProps & Props>(
  ({ placeholder = 'Type to find', disabled, error, ...props }, forwardedRef) => (
    <FormItem error={error}>
      <DropdownSelect
        isAsync
        isClearable
        cacheOptions
        placeholder={placeholder}
        openMenuOnClick={false}
        loadOptions={addressSearch}
        isDisabled={disabled}
        error={error}
        ref={forwardedRef}
        {...props}
      />
    </FormItem>
  )
)

export default SearchBox
