import React, { useEffect } from 'react'
import styled from 'styled-components'
import { COLORS, Flex, SHADOWS } from '@tourlane/tourlane-ui'
import { AlertIcon, CloseIcon } from '../Icon'

const Container = styled.div`
  display: inline-flex;
  pointer-events: all;
  background-color: ${COLORS.SENSATION_WHITE};
  box-shadow: ${SHADOWS.SHADOW_FOCUSED};
  padding: 8px 17px;
  margin-bottom: 15px;
  border-radius: 20px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  line-height: 1.5;
`

const Message = styled.div`
  display: flex;
`

const Action = styled.div`
  display: flex;
`

const StyledCloseIcon = styled(CloseIcon)`
  margin-left: 12px;
  align-items: center;

  & svg {
    width: 15px;
    height: 15px;
  }
`

const StyledAlertIcon = styled(AlertIcon)`
  cursor: initial;
  margin-right: 12px;
`

/// default action that calls the provided onClose callback on click
const getDefaultAction = onClose => <StyledCloseIcon onClick={onClose} />

/**
 * Notification component.
 *
 * @name Notification
 * @param {String} message
 * @param {string} variant
 * @returns Component wrapped with notifications
 */
const Notification = ({
  // The action to display, if any (node)
  action,

  // The message to display (node)
  message = 'Notification',

  // Type of notification. 'default' or 'error'.
  variant = 'default',

  // If true, the notification is open
  open = true,

  // Time to wait before calling the onClose function. This behavior is Disabled if the value is null
  autoHideDuration = 6000,

  // Callback fired when the component requests to be closed
  onClose = () => {},

  ...otherProps
}) => {
  // if action is undefined, show default action
  const actionElement = typeof action === 'undefined' ? getDefaultAction(onClose) : action

  // customize message element depending on variant
  let messageElement = message
  if (variant === 'error') {
    messageElement = (
      <Flex direction="ltr">
        <StyledAlertIcon />
        {message}
      </Flex>
    )
  }

  // set timer to call onClose when autoHideDuration passes
  useEffect(() => {
    let timer = null
    if (autoHideDuration) {
      timer = setTimeout(() => {
        onClose()
      }, autoHideDuration)
    }
    return () => {
      timer && clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoHideDuration])

  return (
    <Container {...otherProps}>
      <Message>{messageElement}</Message>
      {actionElement ? <Action>{actionElement}</Action> : null}
    </Container>
  )
}

export default Notification
