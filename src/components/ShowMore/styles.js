import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const BlockTextWrapper = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  ${({ size }) => `font-size: ${size}`};
  line-height: 1.4;
`

export const ButtonWrapper = styled.span`
  font-weight: 600;
  font-size: 18px;

  > button {
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0;
    margin-left: 7px;
    background-color: transparent;
    border: 0;
    font-weight: 600;
    font-size: 20px;
    border-bottom: 3px solid ${COLORS.ADVENTURE_GREEN};
    display: inline;

    ${({ isCollapsed }) =>
      isCollapsed &&
      css`
        margin-left: 0;
        margin-top: 10px;
      `}

    &:focus {
      outline: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
`
