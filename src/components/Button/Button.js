import styled, { css } from 'styled-components'
import {
  Button as TuiButton,
  SecondaryButton as TuiSecondaryButton,
  AlarmButton as TuiAlarmButton,
  COLORS
} from '@tourlane/tourlane-ui'

export const sharedButtonStyle = css`
  padding: 0 20px;
  line-height: 3.5;
  font-size: 14px;
  white-space: nowrap;
`
/**
 * Uses TUI default button with Item Curator styles
 * @name Button
 */
const Button = styled(TuiButton)`
  ${sharedButtonStyle}
`

const secondaryButtonDisabledStyle = css`
  color: ${COLORS.ELEMENT_GRAY};
  background: ${COLORS.LINE_GRAY};
`

/**
 * Uses TUI secondary button with Item Curator styles
 * @name SecondaryButton
 */
const SecondaryButton = styled(TuiSecondaryButton)`
  ${sharedButtonStyle}
  ${props => (props.disabled ? secondaryButtonDisabledStyle : '')}
`

/**
 * Uses TUI alarm button with Item Curator styles
 * @name AlarmButton
 */
const AlarmButton = styled(TuiAlarmButton)`
  ${sharedButtonStyle}
`

export { Button, SecondaryButton, AlarmButton }
