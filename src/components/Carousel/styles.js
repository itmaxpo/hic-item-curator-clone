import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const CarouselWrapper = styled.div`
  position: relative;
`

export const CancelButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
  padding: 10px;

  &:hover {
    background-color: ${COLORS.NIGHTINGALE_BLACK};
    opacity: 0.35;
    border-radius: 50%;
  }

  svg g path {
    fill: ${COLORS.SENSATION_WHITE};
  }
`
