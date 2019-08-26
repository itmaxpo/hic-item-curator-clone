import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'
import Loader from 'components/Loader'

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
  border-bottom: 1px solid ${COLORS.LINE_GRAY};
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

export const StyledLoader = styled(Loader)`
  && {
    height: 200px;
  }
`
