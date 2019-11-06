import styled from 'styled-components'
import RichTextEditor from 'components/RichTextEditor'

const StyledRichTextEditor = styled(RichTextEditor)`
  height: 100%;

  > div {
    height: 100%;
  }

  > div > div {
    height: 100%;
  }
`

export default StyledRichTextEditor
