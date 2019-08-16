import styled from 'styled-components'
import { FlexContainer } from '@tourlane/tourlane-ui'

export const SearchActionsWrapper = styled(FlexContainer)`
  padding: 20px 108px !important;
  position: sticky;
  top: 80px;
  border-radius: 4px;
  z-index: 10;
  transition: top 0.5s ease-out;

  > * {
    margin-right: 6px;
  }
`

export const ActionIcons = styled.div`
  margin-left: 6px;
`
