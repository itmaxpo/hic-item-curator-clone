import React from 'react'
import { capitalize } from 'lodash'
import { Wrapper, StyledCard, StyledSubline } from './styles'

/**
 * Returns a small card with a provided icon and label,
 * if selected, renders a green bottom border.
 *
 * @name IconCard
 * @param {React.Component} icon
 * @param {String} label
 * @param {Boolean} selected
 */
const IconCard = ({ icon, label, value, selected, ...rest }) => {
  const Icon = icon

  return (
    <Wrapper {...rest}>
      <StyledCard withHover selected={selected}>
        <Icon />
        <StyledSubline>{capitalize(label)}</StyledSubline>
      </StyledCard>
    </Wrapper>
  )
}

export default IconCard
