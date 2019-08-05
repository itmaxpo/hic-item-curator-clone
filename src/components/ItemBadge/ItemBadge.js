import React from 'react'
import { BadgeWrapper } from './styles'

/**
 * This is element implementing Badge functionality
 *
 * @param {Array<React.Component>} children
 * @param {String} width
 */
const ItemBadge = ({ width, children }) => {
  return <BadgeWrapper width={width}>{children}</BadgeWrapper>
}

export default ItemBadge
