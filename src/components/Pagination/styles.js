import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

const paddingForButtons = '6px'

const buttonStyles = css`
  border-width: 0;
  background-color: transparent;
  outline: none;
  padding: 4px;
  color: ${COLORS.NIGHTINGALE_BLACK};
  font-family: "Source Sans Pro", serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0 ${paddingForButtons};
  padding: 2px ${paddingForButtons};
  border-radius: 2px;
  box-sizing: content-box;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
    padding: 4px ${paddingForButtons} 2px ${paddingForButtons};
  }

  &.active {
    border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
    padding: 2px ${paddingForButtons} 2px ${paddingForButtons};

    &:hover {
      cursor: pointer;
    }
  }

  &.empty {
    opacity: 0;
    pointer: auto;
    padding: 4px ${paddingForButtons} 0 ${paddingForButtons};

    &:hover {
      cursor: default;
    }
  }
`

export const prevNextStyles = css`
  height: 26px;
  width: 12px;
  padding: 4px ${paddingForButtons} 0 ${paddingForButtons};
  position: relative;
  top: 2px;

  &:hover {
    padding: 4px ${paddingForButtons} 0px ${paddingForButtons} !important;
  }

  svg g {
    stroke: ${COLORS.INACTIVE_GRAY}

    &:hover {
      cursor: pointer;
      color: ${COLORS.NIGHTINGALE_BLACK}
      border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
    }
  }
`

export const PrevButton = styled.button`
  ${buttonStyles}
  ${({ width }) => `width: ${width}`}
  ${prevNextStyles}
  
`

export const NextButton = styled.button`
  ${buttonStyles}
  ${prevNextStyles}
`

export const PaginationButton = styled.button`
  ${buttonStyles}
`
