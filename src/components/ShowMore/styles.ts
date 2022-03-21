import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'
import { ForwardedRef } from 'react'
interface IWrapper {
  isCollapsed: boolean
  ref: ForwardedRef<HTMLDivElement>
}

export const Wrapper = styled.div<IWrapper>`
  div.MuiCollapse-wrapperInner {
    ${({ isCollapsed }) =>
      !isCollapsed &&
      css`
        height: 100%;
      `}
  }
`

interface IBlockTextWrapper {
  size: string
}

export const BlockTextWrapper = styled.div<IBlockTextWrapper>`
  font-family: 'Source Sans Pro', sans-serif;
  ${({ size }) => `font-size: ${size}`};
  line-height: 1.4;
  height: 100%;
`
interface IButtonWrapper {
  isCollapsed?: boolean
}
export const ButtonWrapper = styled.span<IButtonWrapper>`
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
