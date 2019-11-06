import React from 'react'
import styled from 'styled-components'
import Loader from 'components/Loader'
import ClipLoader from 'react-spinners/ClipLoader'
import { COLORS, BlurInTransition } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`

const StyledLoader = styled(Loader)`
  && {
    position: relative;
    height: auto;
    padding: 37px;
  }
`

export const Preloader = () => (
  <StyledLoader>
    <ClipLoader color={COLORS.ADVENTURE_GREEN} />
  </StyledLoader>
)

export const StyledBlurInTransition = styled(BlurInTransition)`
  > img {
    ${({ isVertical }) =>
      isVertical &&
      `
      object-fit: contain;
    `}
  }
`
