import styled from 'styled-components'
import { FlexContainer } from '@tourlane/tourlane-ui'
import RichTextEditor from 'components/RichTextEditor'
import { TitleWithContent } from '../styles'

export const Column = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  ${({ isExpanded }) => (isExpanded ? 'width: 49%;' : 'width: 100%;')}
`

export const TitleContainer = styled(FlexContainer)`
  height: 36px;
`

export const StyledRichTextEditor = styled(RichTextEditor)`
  height: 100%;

  > div {
    height: 100%;
  }

  > div > div {
    height: 100%;
  }
`

export const StyledTitleWithContent = styled(TitleWithContent)`
  overflow: hidden;
  padding-bottom: 20px;
`
