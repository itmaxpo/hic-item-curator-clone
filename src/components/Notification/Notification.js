import styled from 'styled-components'
import { COLORS, Flex, SHADOWS, NotificationBlock } from '@tourlane/tourlane-ui'
import { AlertIcon, CloseIcon } from 'components/Icon'

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
const getDefaultAction = (onClose) => <StyledCloseIcon onClick={onClose} />

/**
 * Notification component.
 */
const Notification = ({
  // The action to display, if any (node)
  action,

  // The message to display (node)
  message = 'Notification',

  // Type of notification. 'default' or 'error'.
  variant = 'default',

  type = 'simple',

  // If true, the notification is open
  open = true,

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

  return type === 'block' ? (
    <NotificationBlock
      style={{ marginBottom: '5px' }}
      width={[440, null, 660]}
      variant={variant}
      message={message}
      {...otherProps}
    />
  ) : (
    <Container {...otherProps}>
      <Message>{messageElement}</Message>
      {actionElement && <Action>{actionElement}</Action>}
    </Container>
  )
}

export default Notification
