import styled, { css } from 'styled-components'
import { COLORS } from '@tourlane/tourlane-ui'

interface WrapperProps {
  isEditing?: boolean
  resizable?: boolean
  textWrap?: boolean
  disabled?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  min-height: 116px;
  border-radius: 4px;
  cursor: text;
  font-size: 15px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);

  ${(props) =>
    props.isEditing &&
    css`
      border: 1px solid ${COLORS.ELEMENT_GRAY};
    `}

  ${(props) =>
    props.resizable &&
    css`
      resize: vertical;
      overflow: auto;
      min-height: 150px;
    `}

  ${(props) =>
    !props.textWrap &&
    css`
      & .draft-editor-container .public-DraftStyleDefault-block {
        white-space: nowrap;
      }
    `}

    ${(props) =>
    props.disabled &&
    css`
      background-color: ${COLORS.BACKGROUND_GRAY};
      cursor: not-allowed;
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
