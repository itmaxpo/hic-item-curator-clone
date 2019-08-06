import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'

export const SearchActionsWrapper = styled(FlexContainer)`
  > * {
    margin-right: 6px;
  }
`

export const IconData = styled.span`
  &:hover {
    cursor: pointer;
    background-color: ${COLORS.ADVENTURE_GREEN};
  }

  ${({ isActive }) => `
    svg g {
      fill: ${isActive ? COLORS.NIGHTINGALE_BLACK : ''};`}
  }
`

export const ActionIcons = styled.div`
  margin-left: 6px;
`

export const PaginationCenteredWrapper = styled.div`
  flex-grow: 2;
  text-align: center;
`
