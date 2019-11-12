import styled from 'styled-components'
import { FlexContainer, COLORS, Accordion } from '@tourlane/tourlane-ui'
import RichTextEditor from 'components/RichTextEditor'

export const StyledAccordion = styled(Accordion)`
  padding: 30px 60px;
  font-family: 'Source Sans Pro', sans-serif;
`

export const TitleWithContent = styled.div`
  margin-bottom: 40px;
  padding: 0 60px;
  font-family: SourceSansPro;
  position: relative;

  ${({ withoutPadding }) => withoutPadding && `padding: 0 0;`}

  > h4 {
    color: #3f4144;
    margin-bottom: 20px;

    ${({ withoutPadding }) => withoutPadding && `padding: 0 60px;`}
  }
`

export const MapWrapper = styled.div`
  height: 500px;
  padding-bottom: 60px;
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

export const StyledRichTextEditor = styled(RichTextEditor)`
  margin: 20px 60px 0 60px;
`

export const GeoWrapper = styled(FlexContainer)`
  margin-bottom: 20px !important;

  > p {
    font-weight: bold;
    margin-right: 10px;
  }

  > div {
    width: 40%;
  }
`