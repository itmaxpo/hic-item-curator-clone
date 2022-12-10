import React, { FC } from 'react'
import { BadgeWrapper } from './styles'

interface IItemBadge {
  width: string
  color?: string
  background?: string
  height?: string
  padding?: string
  children: React.ReactNode
}

const ItemBadge: FC<IItemBadge> = ({ width, height, padding, color, background, children }) => {
  return (
    <BadgeWrapper
      width={width}
      height={height}
      padding={padding}
      color={color}
      background={background}
    >
      {children}
    </BadgeWrapper>
  )
}

export default ItemBadge
