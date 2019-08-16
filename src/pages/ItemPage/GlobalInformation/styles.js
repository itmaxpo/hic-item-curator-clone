import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'

export const TitleWithContent = styled.div`
  margin-bottom: 40px;
  padding: 0 60px;
  font-family: SourceSansPro;

  ${({ withoutPadding }) => withoutPadding && `padding: 0 0;`}

  > h4 {
    color: #3f4144;
    margin-bottom: 20px;

    ${({ withoutPadding }) => withoutPadding && `padding: 0 60px;`}
  }
`

export const MapWrapper = styled.div`
  height: 500px;
`

export const SearchItemWrapper = styled(FlexContainer)`
  border-top: 1px solid ${COLORS.LINE_GRAY};
  background-color: ${COLORS.SENSATION_WHITE};
  font-family: 'Source Sans Pro', serif;
  font-size: 20px;
  padding: 40px 60px !important;

  &:last-child {
    border-bottom: 1px solid ${COLORS.LINE_GRAY};
  }
`

export const ItemTitle = styled(FlexContainer)`
  padding: 0;
  margin: 2px 0 0 0;
  font-size: 22px;
  line-height: 1.45;
  font-weight: 600;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const ItemDescription = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${COLORS.NIGHTINGALE_BLACK};
`

export const StyledItemBadge = styled.div`
  height: 21px;
  border-radius: 10px;
  background-color: ${COLORS.ELEMENT_GRAY};
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 600;
  line-height: 2;
  letter-spacing: 2.86px;
  text-align: center;
  color: ${COLORS.SENSATION_WHITE};
  padding: 3px 14px 2px 13px;
  margin-left: 20px;
`
