import styled from 'styled-components'
import { FlexContainer, SecondaryButton } from '@tourlane/tourlane-ui'

export const ActionsWrapper = styled(FlexContainer)`
  padding: 0px 108px !important;
  height: 68px;
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

export const ActionButton = styled(SecondaryButton)`
  && {
    width: 151px;
    height: 36px;
    padding: 0;
    font-size: 14px;

    > span {
      height: 18px;
      margin-left: 7px;
    }
  }
`
