import styled from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

interface IBadgeWrapper {
  width: string
  background?: string
  color?: string
  height?: string
  padding?: string
}
export const BadgeWrapper = styled.div<IBadgeWrapper>`
  width: ${({ width }) => width};
  box-sizing: border-box;
  border-radius: 21px;
  letter-spacing: normal;
  text-align: center;
  vertical-align: center;
  ${({ height }) => `height: ${height ? height : 'auto'}`};
  ${({ padding }) => `padding: ${padding ? padding : '6px 16px'}`};
  ${({ color }) => `color: ${color ? color : COLORS.NIGHTINGALE_BLACK}`};
  ${({ background }) => `background-color: ${background ? background : COLORS.LINE_GRAY}`};

  > p {
    line-height: 1.4;
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }
`
