import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'

export const SearchItemPhotosWrapper = styled(FlexContainer)`
  width: 280px;
  height: 170px;
  position: relative;
  flex-shrink: 0;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(63,65,68,0.3);}

  ${({ isEmpty }) =>
    isEmpty
      ? `
    background-color: ${COLORS.ELEMENT_GRAY}
  `
      : ''}
`

export const BadgeWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
`

export const ImgWrapper = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  // Uncomment this if we need image to fit full width & height of parent block
  // object-fit: contain;
`
