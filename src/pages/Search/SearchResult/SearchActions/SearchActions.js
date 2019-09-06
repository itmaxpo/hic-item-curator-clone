import React from 'react'
import { Checkbox, Tooltip, Base } from '@tourlane/tourlane-ui'
import { SearchActionsWrapper, ActionIcons } from './styles'
import { MergeIcon, MergeInactiveIcon } from 'components/Icon'
import { getSelectedItems } from '../utils'
import OnHoverComponentToggle from 'components/OnHoverComponentToggle'

const getAllActions = selectedItems => {
  const areMoreSelected = selectedItems.length > 1

  return [
    {
      icon: <MergeInactiveIcon />,
      iconHovered: <MergeIcon />,
      tooltipText: 'Merge',
      isActive: areMoreSelected,
      action: 'merge'
    }
  ]
}

/**
 * This component is rendering all search actions, like merge
 *
 * @param {Boolean} isAllSelected             ('Select all' checkbox checked value)
 * @param {Function} onAllSelectClick        (when 'Select all' clicked)
 * @param {Array<Array<Object>>} allResults   (all search results as paginated array: Array of Array's)
 * @param {Function} onActionSelected         (when specific action selected)
 */
export const SearchActions = ({
  isAllSelected,
  onAllSelectClick,
  allResults,
  onActionSelected,
  allSelectedIds
}) => {
  const selectedItems = getSelectedItems(allResults, allSelectedIds)
  const availableActions = getAllActions(selectedItems)

  const onActionClick = ({ isActive, action }) => {
    isActive && onActionSelected(action)
  }

  return (
    <SearchActionsWrapper p={3 / 4} alignItems={'center'} id={'items-sticky-actions'}>
      <Checkbox
        value={isAllSelected}
        name="isAllItemsSelected"
        checked={isAllSelected}
        onChange={() => onAllSelectClick(!isAllSelected)}
      />

      <ActionIcons>
        {availableActions.map(
          (icon, i) =>
            icon.isActive && (
              <Tooltip
                key={i}
                position={'top'}
                trigger={'hover'}
                content={<Base>{icon.tooltipText}</Base>}
              >
                <OnHoverComponentToggle
                  component={icon.icon}
                  hoveredComponent={icon.iconHovered}
                  onClick={() => onActionClick(icon)}
                />
              </Tooltip>
            )
        )}
      </ActionIcons>
    </SearchActionsWrapper>
  )
}

export default SearchActions
