import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'

export const SearchItemBodyWrapper = styled(FlexContainer)`
  flex-grow: 2;
  margin-right: 18px !important;
  margin-left: 10px !important;
  position: relative;
`

export const ItemTitle = styled.p`
  padding: 0;
  margin: 2px 0 0 0;
  font-size: 22px;
  line-height: 1.45;
  font-weight: 600;
  color: ${COLORS.NIGHTINGALE_BLACK};

  > span {
    &:hover {
      cursor: pointer;
      border-bottom: 3px solid ${COLORS.ADVENTURE_GREEN};
    }
  }
`

export const ItemSubtitle = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44;
  color: ${COLORS.INACTIVE_GRAY};
`

export const ItemDescription = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.6;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const BadgeWrapper = styled.div`
  position: absolute;
  top: -2px;
  right: 12px;
  font-weight: 600;
`
