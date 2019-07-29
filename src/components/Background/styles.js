import React from 'react'
import styled from 'styled-components'
import background from 'icons/background.svg'

const StyledImg = styled.img`
  display: block;
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`

export const StyledBackground = () => <StyledImg src={background} />
