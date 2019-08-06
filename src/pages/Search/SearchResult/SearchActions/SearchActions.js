import React from 'react'
import { Checkbox, Tooltip, Base } from '@tourlane/tourlane-ui'
import { SearchActionsWrapper, ActionIcons, IconData, PaginationCenteredWrapper } from './styles'
import PaginationWrapper from 'components/Pagination'
import { MergeIcon } from 'components/Icon'
import { getSelectedItems } from '../utils'

const getAllActions = selectedItems => {
  // const isOneSelected = selectedItems && selectedItems.length > 0
  const areMoreSelected = selectedItems.length > 1

  return [{ icon: <MergeIcon />, tooltipText: 'Merge', isActive: areMoreSelected, action: 'merge' }]
}

export const SearchActions = ({
  isAllSelected,
  onAllSelectClick,
  allResults,
  currentPage,
  pages,
  onPageChange,
  onActionSelected
}) => {
  const selectedItems = getSelectedItems(allResults || [])
  const availableActions = getAllActions(selectedItems)

  const onActionClick = ({ isActive, action }) => {
    isActive && onActionSelected(action)
  }

  return (
    <SearchActionsWrapper p={3 / 4} alignItems={'center'}>
      <Checkbox
        value={isAllSelected}
        name="isAllItemsSelected"
        checked={isAllSelected}
        onChange={() => onAllSelectClick(!isAllSelected)}
      />

      <ActionIcons>
        {availableActions.map((icon, i) => (
          <Tooltip key={i} content={<Base>{icon.tooltipText}</Base>}>
            <IconData isActive={icon.isActive} onClick={() => onActionClick(icon)}>
              {icon.icon}
            </IconData>
          </Tooltip>
        ))}
      </ActionIcons>

      {pages && (
        <PaginationCenteredWrapper>
          <PaginationWrapper
            total={pages * 10}
            limit={10}
            pageCount={10}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </PaginationCenteredWrapper>
      )}
    </SearchActionsWrapper>
  )
}

export default SearchActions
