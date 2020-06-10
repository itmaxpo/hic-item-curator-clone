import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const BadgeWrapper = styled.div`
  width: ${({ width }) => width};
  box-sizing: border-box;
  padding: 6px 16px;
  border-radius: 21px;
  letter-spacing: normal;
  text-align: center;
  vertical-align: center;
  ${({ color }) => `color: ${color ? color : COLORS.NIGHTINGALE_BLACK}`};
  ${({ background }) => `background-color: ${background ? background : COLORS.LINE_GRAY}`};

  > p {
    line-height: 1.4;
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }
`
