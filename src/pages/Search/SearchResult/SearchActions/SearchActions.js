import React from 'react'
import { Checkbox, Tooltip, Base } from '@tourlane/tourlane-ui'
import { SearchActionsWrapper, ActionIcons, IconData } from './styles'
import { MergeIcon, MergeInactiveIcon } from 'components/Icon'
import { getSelectedItems } from '../utils'

const getAllActions = selectedItems => {
  // const isOneSelected = selectedItems && selectedItems.length > 0
  const areMoreSelected = selectedItems.length > 1

  return [
    {
      icon: <MergeInactiveIcon />,
      iconActive: <MergeIcon />,
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
  onActionSelected
}) => {
  const selectedItems = getSelectedItems(allResults || [])
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
        {availableActions.map((icon, i) => (
          <Tooltip key={i} position={'bottom'} content={<Base>{icon.tooltipText}</Base>}>
            <IconData isActive={icon.isActive} onClick={() => onActionClick(icon)}>
              {icon.isActive ? icon.iconActive : icon.icon}
            </IconData>
          </Tooltip>
        ))}
      </ActionIcons>
    </SearchActionsWrapper>
  )
}

export default SearchActions
