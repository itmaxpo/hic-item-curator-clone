import React, { FC } from 'react'
import { BadgeWrapper } from './styles'

interface IItemBadge {
  width: string
  color?: string
  background?: string
}

const ItemBadge: FC<IItemBadge> = ({ width, color, background, children }) => {
  return (
    <BadgeWrapper width={width} color={color} background={background}>
      {children}
    </BadgeWrapper>
  )
}

export default ItemBadge
