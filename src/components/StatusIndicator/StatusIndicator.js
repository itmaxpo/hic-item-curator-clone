import React from 'react'
import { StatusWrapper, Indicator, StatusText } from './styles'
import { COLORS } from '@tourlane/tourlane-ui'

export const STATUS_IN_PROGRESS = 'inProgress'
export const STATUS_ON_HOLD = 'onHold'
export const STATUS_ONLINE = 'online'
export const STATUS_OFFLINE = 'offline'

export const STATUS_IN_PROGRESS_LABEL = 'In progress'
export const STATUS_ON_HOLD_LABEL = 'On hold'
export const STATUS_ONLINE_LABEL = 'Online'
export const STATUS_OFFLINE_LABEL = 'Offline'

export const statusOptions = [
  { value: STATUS_IN_PROGRESS, label: STATUS_IN_PROGRESS_LABEL },
  { value: STATUS_ON_HOLD, label: STATUS_ON_HOLD_LABEL },
  { value: STATUS_ONLINE, label: STATUS_ONLINE_LABEL },
  { value: STATUS_OFFLINE, label: STATUS_OFFLINE_LABEL }
]

export const statusLabels = {
  [STATUS_IN_PROGRESS]: STATUS_IN_PROGRESS_LABEL,
  [STATUS_ON_HOLD]: STATUS_ON_HOLD_LABEL,
  [STATUS_ONLINE]: STATUS_ONLINE_LABEL,
  [STATUS_OFFLINE]: STATUS_OFFLINE_LABEL
}

export const colorsBasedOnStatus = {
  [STATUS_IN_PROGRESS]: COLORS.ELEMENT_GRAY,
  [STATUS_ON_HOLD]: COLORS.SUNSHINE_YELLOW,
  [STATUS_ONLINE]: COLORS.ADVENTURE_GREEN,
  [STATUS_OFFLINE]: COLORS.RIOJA_RED
}

const StatusIndicator = ({ status, textMargin = '10px' }) => {
  return (
    <StatusWrapper p={0} alignItems={'center'}>
      <Indicator status={status} />
      <StatusText textMargin={textMargin}>{statusLabels[status]}</StatusText>
    </StatusWrapper>
  )
}

export default StatusIndicator
