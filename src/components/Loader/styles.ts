import styled from 'styled-components'
import { FlexContainer } from '@tourlane/tourlane-ui'

interface ILoaderContainer {
  top?: string | number
}
export const LoaderContainer = styled(FlexContainer)<ILoaderContainer>`
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
