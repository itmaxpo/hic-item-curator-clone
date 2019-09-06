import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 20px;
`

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

export const StyledItemBadge = styled.span`
  border-radius: 10px;
  background-color: ${COLORS.ELEMENT_GRAY};
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 600;
  line-height: 2;
  letter-spacing: 2.86px;
  text-align: center;
  color: ${COLORS.SENSATION_WHITE};
  padding: 7px 14px 7px 13px;
  margin-left: 20px;
  position: relative !important;
  top: -4px !important;
  right: 0 !important;
`
