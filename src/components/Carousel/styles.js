import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import { COLORS, CircleIconButton } from '@tourlane/tourlane-ui'

export const CarouselWrapper = styled.div`
  position: relative;

  > div button {
    opacity: 1 !important;
    top: 50% !important;
    height: 34px;
    width: 34px;
    border-radius: 100%;
    background-color: ${COLORS.SENSATION_WHITE} !important;
    box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);

    &:hover {
      box-shadow: 0 2px 17px 0 rgba(63, 65, 68, 0.3) !important;
      background-color: ${COLORS.SENSATION_WHITE} !important;
    }

    &:active {
      transform: translateY(3px);
      background-color: ${COLORS.LINE_GRAY} !important;
      box-shadow: 0 2px 17px 0 rgba(63, 65, 68, 0.3) !important;
    }
  }

  > div button.control-prev {
    left: 10px !important;

    &:before {
      position: absolute;
      top: 9px;
      left: 6px;
      border-right: 8px solid ${COLORS.ELEMENT_GRAY} !important;
    }
  }

  > div button.control-next {
    right: 10px !important;

    &:before {
      position: absolute;
      top: 9px;
      right: 6px;
      border-left: 8px solid ${COLORS.ELEMENT_GRAY} !important;
    }
  }
`

export const CancelButton = styled(CircleIconButton)`
  position: absolute;
  top: 15px;
  right: 10px;
  z-index: 3;
`

export const StyledDialog = styled(Dialog)`
  && {
    > div {
      background-color: rgba(0, 0, 0, 0.55);
    }
  }
`
