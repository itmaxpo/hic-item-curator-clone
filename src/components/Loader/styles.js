import styled from 'styled-components'
import { FlexContainer } from '@tourlane/tourlane-ui'

export const LoaderContainer = styled(FlexContainer)`
  && {
    width: 100%;
    height: 40px;
    margin: auto;
  }

  ${({ top }) => `
    position: absolute;
    top: ${top};
  `}
`
