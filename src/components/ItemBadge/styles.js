import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const BadgeWrapper = styled.div`
  background-color: ${COLORS.LINE_GRAY};
  width: ${({ width }) => width};
  box-sizing: border-box;
  height: 32px;
  padding: 6px 16px;
  border-radius: 21px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  ${({ color }) => `color: ${color ? color : COLORS.NIGHTINGALE_BLACK}`};
`
