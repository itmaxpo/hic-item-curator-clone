import styled from 'styled-components'
import { FlexContainer } from '@tourlane/tourlane-ui'

export const SearchResultContainer = styled.div`
  margin: 0 90px;

  > div {
    margin-top: 20px;

    &:first-child,
    &:last-child {
      margin-top: 0;
    }
  }
`

export const PaginationCenteredWrapper = styled.div`
  flex-grow: 2;
  text-align: center;
  min-height: 32px;
`

export const BottomWrapper = styled(FlexContainer)`
  margin: 0 90px;
  position: relative;
`

export const ItemsPerPageWrapper = styled(FlexContainer)`
  min-width: 140px;
  height: 38px;
  position: absolute;
  right: 0;
  top: 10px;

  > p {
    margin-right: 10px;
  }

  > div {
    width: 100px;
  }
`
