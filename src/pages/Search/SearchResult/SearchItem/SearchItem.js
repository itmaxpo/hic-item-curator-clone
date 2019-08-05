import React from 'react'
import { SearchItemWrapper, SearchItemCheckbox } from './styles'
import SearchItemBody from './components/SearchItemBody'
import SearchItemPhotos from './components/SearchItemPhotos'

/**
 * This component is rendering item with ability to select/deselect
 * and showing more description or not
 *
 * @param {Object} item
 * @param {Number} index
 * @param {Function} onSelect
 */
export const SearchItem = ({ item, index, onItemSelect }) => {
  const onCheckboxChange = () => {
    const selectedItem = { ...item, isSelected: !item.isSelected }
    onItemSelect(selectedItem, index)
  }

  return (
    <SearchItemWrapper p={3 / 4} direction={'ltr'}>
      <SearchItemCheckbox
        id={index}
        name="isItemSelected"
        checked={item.isSelected}
        onChange={onCheckboxChange}
      />

      <SearchItemBody item={item} />

      <SearchItemPhotos photos={item.photos} />
    </SearchItemWrapper>
  )
}

export default SearchItem
