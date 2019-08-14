import React from 'react'
import { BadgeWrapper } from './styles'

/**
 * This is element implementing Badge functionality
 *
 * @param {Array<React.Component>} children
 * @param {String} width
 */
const ItemBadge = ({ width, color, children }) => {
  return (
    <BadgeWrapper width={width} color={color}>
      {children}
    </BadgeWrapper>
  )
}

export default ItemBadge
