import React from 'react'
import { StyledBackground } from './styles'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Background = ({ children }) => (
  <Wrapper>
    <StyledBackground />
    {children}
  </Wrapper>
)

export default Background
