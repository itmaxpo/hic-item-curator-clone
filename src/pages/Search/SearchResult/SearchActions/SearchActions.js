import React from 'react'
import { Checkbox } from '@tourlane/tourlane-ui'
import { SearchActionsWrapper, ActionsDropdown } from './styles'
import { searchActions } from '../utils'
import { ActionIcon } from 'components/Icon'
import Pagination from 'components/Pagination'

export const SearchActions = ({
  isAllSelected,
  onAllSelectClick,
  actionSelected,
  onStatusSelect,
  dropdownPlacement,
  currentPage,
  pages,
  onPageChange
}) => {
  return (
    <SearchActionsWrapper p={3 / 4} alignItems={'center'}>
      <Checkbox
        value={isAllSelected}
        name="isAllItemsSelected"
        checked={isAllSelected}
        onChange={onAllSelectClick}
      />
      <ActionsDropdown
        menuPlacement={dropdownPlacement}
        value={actionSelected}
        options={searchActions}
        icon={<ActionIcon />}
        placeholder="Disabled with icon"
        onChange={onStatusSelect}
      />
      {pages && (
        <Pagination
          total={pages * 10}
          limit={10}
          pageCount={10}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </SearchActionsWrapper>
  )
}

export default SearchActions
