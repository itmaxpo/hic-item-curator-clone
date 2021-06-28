import React from 'react'
import styled from 'styled-components'
import { animated, useTransition } from 'react-spring'
import { Notification } from './index'

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 80px;
  margin: 0 auto;
  left: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  align-items: center;
`

/**
 * NotificationHub component.
 */
const NotificationHub = ({ notifications }) => {
  const notificationElements = notifications.map((notification) => (
    <Notification {...notification} />
  ))

  const transitions = useTransition(notificationElements, (item) => item.key, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 'auto' },
    leave: { opacity: 0, height: 0 }
  })

  return (
    <Container>
      {transitions.map(({ key, item, props }) => (
        <animated.div key={key} style={{ pointerEvents: 'auto', ...props }}>
          {item}
        </animated.div>
      ))}
    </Container>
  )
}

export default NotificationHub
