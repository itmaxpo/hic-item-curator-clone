import React from 'react'
import { BadgeWrapper } from './styles'

/**
 * This is element implementing Badge functionality
 *
 * @param {Array<React.Component>} children
 * @param {String} width
 */
const ItemBadge = ({ width, color, background, children }) => {
  return (
    <BadgeWrapper width={width} color={color} background={background}>
      {children}
    </BadgeWrapper>
  )
}

export default ItemBadge
