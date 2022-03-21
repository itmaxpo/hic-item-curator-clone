import React, { FC } from 'react'
import { Checkbox, Flex, Tooltip, ExtraSmall, IconButton, COLORS } from '@tourlane/tourlane-ui'
import InfoIcon from '@tourlane/iconography/Glyphs/Notifications/Info'
import { ActionsWrapper, ActionIcons, ActionButton, MergeInfoWrapper } from './styles'
import { MergeIcon } from 'components/Icon'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { ISelectedItems } from '../SearchResult'

const getAllActions = (selectedItems: ISelectedItems) => {
  return [
    {
      icon: () => <MergeIcon />,
      isActive: selectedItems.length > 1,
      action: 'merge',
      label: 'Merge'
    }
  ]
}

interface IActions {
  isAllSelected: boolean
  onAllSelectClick: Function
  onActionClick: Function
  selectedItems: ISelectedItems

  itemType: string | undefined
  selectAllRequired: boolean
}
/**
 * This component renders a toolbar with actions for items, like merge
 *
 * @param {Boolean} isAllSelected             ('Select all' checkbox checked value)
 * @param {Function} onAllSelectClick         (callback executed when 'Select all' clicked)
 * @param {Array<Array<Object>>} allResults   (all search results as paginated array: Array of Array's)
 * @param {Function} onActionClick            (callback executed when specific action is clicked)
 * @param {Array<Object>} selectedItems       (selected search results items)
 * @param {Boolean} selectAllRequired         (it will decide either to show select all checkbox or not)
 * @param {string} itemType                   (item type from utils/constants)
 */
export const Actions: FC<IActions> = ({
  isAllSelected,
  onAllSelectClick,
  onActionClick,
  selectedItems,
  itemType,
  selectAllRequired = true
}) => {
  const availableActions = getAllActions(selectedItems)

  const onClick = ({ action }: { action: string }) => {
    onActionClick(action, selectedItems)
  }

  const ActionContainer = selectAllRequired ? ActionIcons : Flex

  return (
    <ActionsWrapper p={3 / 4} alignItems={'center'} id={'items-sticky-actions'}>
      {selectAllRequired && (
        <Checkbox
          name="isAllItemsSelected"
          checked={isAllSelected}
          onChange={() => onAllSelectClick(!isAllSelected)}
        />
      )}
      <ActionContainer>
        <Flex alignItems="center">
          {availableActions.map(
            (action, i) =>
              action.isActive && (
                <ActionButton data-test={action.action} key={i} onClick={() => onClick(action)}>
                  {action.label}
                  {action.icon()}
                </ActionButton>
              )
          )}
          {itemType === ACCOMMODATION_ITEM_TYPE && selectedItems.length > 1 && (
            <MergeInfoWrapper pl={10}>
              <Tooltip
                position={'bottom'}
                content={
                  <Flex py={12} px={2}>
                    <ExtraSmall data-test="mergeInfoMessage">
                      Only 2 items can be merged at a time.
                    </ExtraSmall>
                  </Flex>
                }
              >
                <IconButton
                  data-test="mergeInfo"
                  icon={<InfoIcon />}
                  iconColor={COLORS.ADVENTURE_GREEN}
                  iconSize={22}
                />
              </Tooltip>
            </MergeInfoWrapper>
          )}
        </Flex>
      </ActionContainer>
    </ActionsWrapper>
  )
}

export default Actions
