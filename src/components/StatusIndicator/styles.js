import styled from 'styled-components'
import { colorsBasedOnStatus } from './StatusIndicator'
import { FlexContainer } from '@tourlane/tourlane-ui'

export const StatusWrapper = styled(FlexContainer)`
  width: 100%;
`

export const Indicator = styled.div`
  ${({ status }) => `
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${colorsBasedOnStatus[status]};
    float: left;
  `}
`

export const StatusText = styled.div`
  ${({ textMargin }) => `
    margin-left: ${textMargin}
  `}
`
