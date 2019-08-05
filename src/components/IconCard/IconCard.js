import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash'
import { Card, Subline, COLORS } from '@tourlane/tourlane-ui'

const Wrapper = styled.div`
  min-width: 140px;
  height: 90px;
  cursor: pointer;
`

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  border-bottom: solid 5px ${({ selected }) => (selected ? COLORS.ADVENTURE_GREEN : 'transparent')};

  && * {
    margin: 0 auto;
  }

  && > span {
    margin-top: 10px;
  }

  > p {
    position: relative;
    top: 5px;
  }
`

const StyledSubline = styled(Subline)`
  & {
    font-size: 16px;
    line-height: 26px;
  }
`
/**
 * Returns a small card with a provided icon and label,
 * if selected, renders a green bottom border.
 *
 * @name IconCard
 * @param {React.Component} icon
 * @param {String} label
 * @param {Boolean} selected
 */
const IconCard = ({ icon, label, selected, ...rest }) => {
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
