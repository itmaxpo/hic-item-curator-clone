import React from 'react'
import styled from 'styled-components'
import { COLORS, SHADOWS } from '@tourlane/tourlane-ui'
import Tooltip from '@material-ui/core/Tooltip'

const Oval = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.BACKGROUND_GRAY};
  background: ${COLORS.SENSATION_WHITE};
  border-radius: 100%;
  box-shadow: ${SHADOWS.SHADOW_DEFAULT};
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, opacity 0.15s ease-in-out, transform 0.15s ease-in-out;

  ${({ visibleOnHover }) =>
    visibleOnHover &&
    `
    opacity: 0;
    transform: scale(0.5);
  `}

  &:hover {
    box-shadow: ${SHADOWS.SHADOW_FOCUSED};
  }
  &:active {
    background-color: ${COLORS.BACKGROUND_GRAY};
    transform: translateY(2px);
  }
`
const OvalWrapper = styled.div`
  ${({ visibleOnHover }) =>
    visibleOnHover &&
    `
    position: absolute;
    right: 20px;
    left: 100px;
    margin-top: -17px;

    &:hover {
      ${Oval} {
        opacity: 1;
        transform: scale(1);
      }
    }  
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  z-index: 1;
`

/**
 * Wrapper, that will render circle button with two options:
 *  - show tooltip and {children} if tooltipText is true
 *  - show {children} if tooltipText is false
 *
 * @name CircleButton
 * @param {Function} onClick
 * @param {Boolean} visibleOnHover
 * @param {String} tooltipText
 */
const CircleButton = ({ onClick, id, visibleOnHover = true, className, tooltipText, children }) => {
  return (
    <OvalWrapper id={id} className={className} visibleOnHover={visibleOnHover}>
      {tooltipText ? (
        <Tooltip title={tooltipText}>
          <Oval visibleOnHover={visibleOnHover} onClick={onClick}>
            {children}
          </Oval>
        </Tooltip>
      ) : (
        <Oval visibleOnHover={visibleOnHover} onClick={onClick}>
          {children}
        </Oval>
      )}
    </OvalWrapper>
  )
}

export default CircleButton
