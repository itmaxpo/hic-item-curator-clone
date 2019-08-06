import React, { useState } from 'react'
import { Collapse } from '@material-ui/core'
import Truncate from 'react-truncate'
import { ButtonWrapper } from './styles'

/**
 * Component serves as a wrapper for the text components, that need to have
 * show more/less text functionality
 *
 * @param height (optional) Provide height of collapsed block
 */
const Collapsable = ({ children, height = '60px' }) => {
  // We use 2 states to make sure the collapse transition happens before the
  // text is truncated.
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isTruncated, setIsTruncated] = useState(true)

  const toggleLines = event => {
    event.preventDefault()

    setIsTruncated(v => !v)

    if (!isCollapsed) {
      setTimeout(() => {
        setIsCollapsed(v => !v)
      }, 300)
    } else {
      setIsCollapsed(v => !v)
    }
  }

  return (
    <div>
      <Collapse in={!isTruncated} collapsedHeight={height}>
        <Truncate
          lines={isCollapsed && 2}
          ellipsis={
            <ButtonWrapper>
              ... <button onClick={toggleLines}>{'more'}</button>
            </ButtonWrapper>
          }
        >
          {children}
        </Truncate>
        {!isCollapsed && (
          <ButtonWrapper>
            {' '}
            <button onClick={toggleLines}>{'less'}</button>
          </ButtonWrapper>
        )}
      </Collapse>
    </div>
  )
}

export default Collapsable
