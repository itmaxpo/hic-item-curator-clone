import { P, Link, COLORS } from '@tourlane/tourlane-ui'
import styled from 'styled-components'

export const StyledP = styled(P)`
  & {
    margin-top: 24px;
    margin-bottom: 10px;
  }
`

export const StyledLink = styled(Link)`
  color: ${COLORS.SENSATION_WHITE} !important;

  &:hover {
    color: ${COLORS.SENSATION_WHITE};
  }
`
