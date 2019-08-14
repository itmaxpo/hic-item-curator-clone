import styled from 'styled-components'
import { FlexContainer, COLORS } from '@tourlane/tourlane-ui'

export const TitleWithContent = styled.div`
  margin-bottom: 40px;
  padding: 0 60px;
  font-family: SourceSansPro;

  ${({ withoutPadding }) => withoutPadding && `padding: 0 0;`}

  > p {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 4px;
    color: #3f4144;
    text-transform: uppercase;
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
  font-family: SourceSansPro, serif;
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
  font-size: 18px;
  line-height: 1.6;
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
