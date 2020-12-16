import React from 'react'
import { Checkbox } from '@tourlane/tourlane-ui'
import { ActionsWrapper, ActionIcons, ActionButton } from './styles'
import { MergeIcon } from 'components/Icon'

const getAllActions = selectedItems => {
  return [
    {
      icon: () => <MergeIcon />,
      isActive: selectedItems.length > 1,
      action: 'merge'
    }
  ]
}

/**
 * This component renders a toolbar with actions for items, like merge
 *
 * @param {Boolean} isAllSelected             ('Select all' checkbox checked value)
 * @param {Function} onAllSelectClick         (callback executed when 'Select all' clicked)
 * @param {Array<Array<Object>>} allResults   (all search results as paginated array: Array of Array's)
 * @param {Function} onActionClick            (callback executed when specific action is clicked)
 * @param {Array<Object>} selectedItems       (selected search results items)
 */
export const Actions = ({
  isAllSelected,
  onAllSelectClick,
  allResults,
  onActionClick,
  selectedItems
}) => {
  const availableActions = getAllActions(selectedItems)

  const onClick = ({ action }) => {
    onActionClick(action, selectedItems)
  }

  return (
    <ActionsWrapper p={3 / 4} alignItems={'center'} id={'items-sticky-actions'}>
      <Checkbox
        value={isAllSelected}
        name="isAllItemsSelected"
        checked={isAllSelected}
        onChange={() => onAllSelectClick(!isAllSelected)}
      />

      <ActionIcons>
        {availableActions.map(
          (action, i) =>
            action.isActive && (
              <ActionButton data-test={action.action} key={i} onClick={() => onClick(action)}>
                Merge
                {action.icon()}
              </ActionButton>
            )
        )}
      </ActionIcons>
    </ActionsWrapper>
  )
}

export default Actions
