import React, { useState } from 'react'
import { HoveredBlock } from './styles'

/**
 * This element, that switch between <component> and <hoveredComponent> on hover
 *
 * @name HoveredElement
 * @param {<Component>} component
 * @param {<Component>} hoveredComponent
 */
const OnHoverComponentToggle = ({ component, hoveredComponent, ...rest }) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseHover = () => {
    setIsHovering(!isHovering)
  }

  return (
    <HoveredBlock onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} {...rest}>
      {isHovering ? hoveredComponent : component}
    </HoveredBlock>
  )
}

export default OnHoverComponentToggle
