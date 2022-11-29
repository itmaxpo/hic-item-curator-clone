import styled from 'styled-components'
import { Hr } from '@tourlane/tourlane-ui'

export const FullWidthHr = styled(Hr)<{ space: number }>`
  ${({ space = 0 }) => `
    margin-left: -${space}px;
    width: calc(100% + ${2 * space}px);
  `}
`
