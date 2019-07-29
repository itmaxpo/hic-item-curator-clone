import React from 'react'
import Background from './Background'
import { Card } from '@tourlane/tourlane-ui'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BackgroundSingleCard = ({ children, cardProps = {} }) => (
  <Background>
    <StyledCard {...cardProps}>{children}</StyledCard>
  </Background>
)

export default BackgroundSingleCard
