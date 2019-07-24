import React from 'react'
import { Card } from '@tourlane/tourlane-ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

// const Background = styled.img`
//   display: block;
//   position: absolute;
//   z-index: -1;
//   width: 100vw;
//   height: 100vh;
//   object-fit: cover;
// `

const StyledCard = styled(Card)`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LayoutSingleCard = ({ children, cardProps = {} }) => (
  <Wrapper>
    {/* <Background src={background} /> */}
    <StyledCard {...cardProps}>{children}</StyledCard>
  </Wrapper>
)

export default LayoutSingleCard
