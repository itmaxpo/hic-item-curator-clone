import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div``

export const StyledCollapse = styled.div`
  text-align: left;
  border-bottom: 1px solid ${COLORS.LINE_GRAY};
  oberflow: hidden;

  &:first-child {
    border-top: 1px solid ${COLORS.LINE_GRAY};
  }
`

export const StyledHeader = styled.button`
  background-color: transparent;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  border-radius: 0;
  outline: none;
  width: 100%;
  height: 112px;
  padding: 40px 60px 20px 60px;
  border-width: 0;
  position: relative;

  > span {
    position: absolute;
    right: 20px;
    top: 50%;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    cursor: pointer;
  }
`

export const StyledBody = styled.div`
  margin: 20px 60px;
`
