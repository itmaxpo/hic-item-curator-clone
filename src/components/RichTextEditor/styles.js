import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

export const Wrapper = styled.div`
  min-height: 116px;
  border-radius: 4px;
  cursor: text;
  font-size: 15px;

  &:hover {
    box-shadow: 0 2px 17px 0 rgba(63,65,68,0.3);
  }

  & .DraftEditor-editorContainer {
    height: 100%;
    & div {
      height: 100%;
    }
  }

  ${props =>
    props.isEditing &&
    css`
      border: 1px solid ${COLORS.ELEMENT_GRAY};
    `}

  ${props =>
    props.resizable &&
    css`
      resize: vertical;
      overflow: auto;
      min-height: 150px;
    `}

  ${props =>
    !props.textWrap &&
    css`
      & .draft-editor-container .public-DraftStyleDefault-block {
        white-space: nowrap;
      }
    `}
`

export const StyledLabel = styled.label`
  display: block;
  color: ${COLORS.NIGHTINGALE_BLACK};
  font-family: 'Source Sans Pro', sans-serif;
  margin-bottom: 12px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
`
