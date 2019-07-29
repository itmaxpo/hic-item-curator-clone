import React from 'react'
import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'
import Tooltip from '@material-ui/core/Tooltip'

const IconContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

/**
 * Returns an icon based on activeColor property:
 *  - if no activeColor provided using color
 *  - if activeColor provided using activeColor
 *
 * @name IconButton
 * @param {React.Component} iconComponent
 */
const IconButton = ({
  onClick = () => {},
  iconComponent,
  tooltipLabel = null,
  color = COLORS.ELEMENT_GRAY,
  hoverColor = COLORS.ADVENTURE_GREEN,
  activeColor = COLORS.ADVENTURE_GREEN_FOCUSED,
  ...props
}) => {
  const IconComponent = iconComponent

  const StyledIconContainer = styled(IconContainer)`
    svg path {
      fill: ${color};
      transition: fill 0.15s ease-in-out;
    }

    svg polyline {
      stroke: ${color};
      transition: fill 0.15s ease-in-out;
    }

    :hover,
    :focus {
      svg path,
      svg polygon {
        ${hoverColor && `fill: ${hoverColor};`}
      }
    }

    :hover,
    :focus {
      svg polyline {
        ${hoverColor && `stroke: ${hoverColor};`}
      }
    }

    :active {
      svg path,
      svg polygon {
        ${activeColor && `fill: ${activeColor};`}
      }
    }

    :active {
      svg polyline {
        ${activeColor && `stroke: ${activeColor};`}
      }
    }
  `
  const iconElement = (
    <StyledIconContainer onClick={onClick} {...props}>
      <IconComponent color={color} hoverColor={hoverColor} activeColor={activeColor} />
    </StyledIconContainer>
  )
  return tooltipLabel ? <Tooltip title={tooltipLabel}>{iconElement}</Tooltip> : iconElement
}

export default IconButton
