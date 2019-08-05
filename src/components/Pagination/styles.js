import Pagination from 'react-paginating'
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
  margin: 2px;
  padding: 4px 8px;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    color: ${COLORS.SENSATION_WHITE};
    background-color: ${COLORS.ADVENTURE_GREEN_FOCUSED}
  }

  &.active {
    color: ${COLORS.NIGHTINGALE_BLACK}

    &:hover {
      cursor: pointer;
      color: ${COLORS.SENSATION_WHITE};
      background-color: ${COLORS.ADVENTURE_GREEN_FOCUSED}
    }
  }

  &.empty {
    color: ${COLORS.NIGHTINGALE_BLACK}

    &:hover {
      cursor: auto;
      color: ${COLORS.SENSATION_WHITE};
      background-color: transparent;
    }
  }
`

export const PaginationWrapper = styled(Pagination)``

export const PrevButton = styled.button`
  ${buttonStyles}
  ${({ width }) => `width: ${width}`}
`

export const NextButton = styled.button`
  ${buttonStyles}
`

export const PaginationButton = styled.button`
  ${buttonStyles}
`
