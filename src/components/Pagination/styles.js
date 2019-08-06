import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

const buttonStyles = css`
  border-width: 0;
  background-color: transparent;
  outline: none;
  padding: 4px;
  color: ${COLORS.INACTIVE_GRAY}
  font-family: SourceSansPro;
  font-size: 18px;
  font-weight: 600;
  margin: 0 8px;
  padding: 2px 8px;
  border-radius: 2px;
  box-sizing: content-box;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
    padding: 4px 8px 2px 8px;
  }

  &.active {
    color: ${COLORS.NIGHTINGALE_BLACK}
    border-bottom: 2px solid ${COLORS.ADVENTURE_GREEN}
    padding: 2px 8px 2px 8px;

    &:hover {
      cursor: pointer;
    }
  }

  &.empty {
    opacity: 0;
    pointer: auto;
    padding: 4px 8px 0 8px;

    &:hover {
      cursor: default;
    }
  }
`

export const prevNextStyles = css`
  height: 26px;
  width: 12px;
  padding: 4px 8px 0 8px;

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
