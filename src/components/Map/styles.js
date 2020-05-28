import styled, { css } from 'styled-components'
import { Card, Subline, P } from '@tourlane/tourlane-ui'

export const InfoCardWrapper = styled(Card)`
  position: inherit;
  top: 20px;
  left: 20px;
  padding: 20px;
  width: 240px;
`

const textStyles = css`
  && {
    font-size: 18px;
    line-height: 26px;
    margin: 0;
  }
`

export const Name = styled(Subline)`
  ${textStyles}
  font-weight: bold;
`

export const Info = styled(P)`
  ${textStyles};
  ${({ mt }) => mt && 'margin-top: 10px;'};
`
