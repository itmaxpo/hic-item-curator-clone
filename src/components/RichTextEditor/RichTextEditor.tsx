import React, { useCallback, useEffect, useRef, useState } from 'react'
import cuid from 'cuid'
// @ts-ignore
import { EditorState, Modifier, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
// @ts-ignore
import { Editor } from 'react-draft-wysiwyg'
// @ts-ignore
import draftToHtml from 'draftjs-to-html'
import styled from 'styled-components'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles.css'
import { StyledLabel, Wrapper } from './styles'
import { getRichTextValue } from 'utils/helpers'
import { usePrevious, Base, COLORS, Box } from '@tourlane/tourlane-ui'

const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, 'text/html')
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1)
}

const LimitWrapper = styled.div`
  position: relative;
`
const LimitText = styled(Base)`
  position: absolute;
  top: 9px;
  right: 12px;
`

// Generate an EditorState object from a provided value
const getInitialEditorState = (value: any) => {
  let editorState = EditorState.createEmpty()

  // Initialize editor with provided value
  if (value) {
    if (isHTML(value) && getRichTextValue(value)) {
      // handle HTML value
      const blocksFromHTML = convertFromHTML(value)
      if (blocksFromHTML.contentBlocks) {
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        editorState = EditorState.createWithContent(contentState)
      }
    } else {
      // handle plain text value
      const contentState = ContentState.createFromText(getRichTextValue(value))
      editorState = EditorState.createWithContent(contentState)
    }
  }

  return editorState
}

/**
 * Handle logic related to editor status.
 *
 * Takes the external props 'value' and 'onChange'
 * Returns props that need to be passed to the Editor.
 */
const useEditorState = ({
  value,
  onChange,
  typingStarted
}: {
  value: any
  onChange?: (value: string) => void
  typingStarted: React.MutableRefObject<boolean>
}) => {
  const previousValue = usePrevious(value, true)

  // Keep track of editor state
  const [editorState, setEditorState] = useState(() => getInitialEditorState(value))

  useEffect(() => {
    if (!typingStarted.current && previousValue !== value) {
      setEditorState(() => getInitialEditorState(value))
    }
    // eslint-disable-next-line
  }, [value, previousValue])

  // Handle editor state change
  const onEditorStateChange = useCallback(
    (editorState) => {
      typingStarted.current = true
      // Update editor state
      setEditorState(editorState)

      // Send current HTML to callback
      if (onChange) {
        const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const isEmpty = htmlValue === '<p></p>\n'

        onChange(isEmpty ? '' : htmlValue)
      }
    },
    // eslint-disable-next-line
    [onChange]
  )

  return { editorState, onEditorStateChange }
}

/**
 * Handle logic related to editor pasting rich text.
 * Returns props that need to be passed to the Editor.
 */
const useEditorPaste = (maxLength: number | undefined) => {
  // Generate a unique editorKey that should be unique per-editor
  const editorKey = useRef(cuid()).current

  // Optionally handle pasted text, instead of using the default Draft.js behavior.
  // This is needed to handle extra blank lines generated in Windows.
  const handlePastedText = useCallback(
    (text, html, editorState, onChange) => {
      if (!html) {
        // if this is not a rich text paste, we also fallback to default behavior.
        return false
      }
      // If the editorKey is present in the pasted HTML, it should be safe to
      // assume this is an internal paste.
      // If so, it's better to return false to fallback to the default behavior. This allows to
      // better preserve styling.
      const hasEditorKey = html.indexOf(editorKey) !== -1
      if (hasEditorKey) {
        return false
      }

      // handle maxLength insert case
      if (maxLength !== undefined) {
        const contentLength = editorState.getCurrentContent().getPlainText().length
        let remainingLength = maxLength - contentLength
        if (html.length + contentLength >= maxLength) {
          const newContent = Modifier.insertText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            html.slice(0, remainingLength)
          )

          onChange(EditorState.push(editorState, newContent, 'insert-characters'))
          return true
        }
      }

      // Remove 'new line' characters.
      // These are generated in Windows when copying. On paste they add unwanted blank space.
      html = html.replace(/(\r\n|\n|\r)/gm, '')

      // Insert the post-processed html
      const blocksFromHTML = convertFromHTML(html)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      const blockMap = state.getBlockMap()
      const newState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        blockMap
      )
      onChange(EditorState.push(editorState, newState, 'insert-fragment'))

      // return true to prevent default behavior.
      return true
    },
    [editorKey, maxLength]
  )

  return { editorKey, handlePastedText }
}

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (data: string) => void
  onBlur?: (value: string) => void
  textWrap?: boolean
  resizable?: boolean
  label?: string
  editorProps?: Record<any, any>
  disabled?: boolean
  maxLength?: number
}

const RichTextEditor = React.forwardRef<any, Props>(
  (
    {
      className,
      placeholder,
      value,
      onChange,
      onBlur,
      textWrap = true,
      resizable = false,
      label,
      editorProps = {},
      disabled = false,
      maxLength,
      ...otherProps
    },
    forwardedRef
  ) => {
    // helps to prevent cursor jumping on text changes
    const typingStarted = useRef(false)
    const { editorState, onEditorStateChange } = useEditorState({ value, onChange, typingStarted })
    const { editorKey, handlePastedText } = useEditorPaste(maxLength)

    const onBlurAction = () => {
      typingStarted.current = false
      // If onBlur function provided, return html
      if (onBlur) {
        const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        return onBlur(htmlValue)
      }
    }

    return (
      <Box className={className} mb={5}>
        {label && <StyledLabel>{label}</StyledLabel>}
        <div>
          <Wrapper textWrap={textWrap} resizable={resizable} disabled={disabled} {...otherProps}>
            {maxLength && (
              <LimitWrapper>
                <LimitText color={COLORS.INACTIVE_GRAY}>
                  {editorState.getCurrentContent().getPlainText().length}/{maxLength}
                </LimitText>
              </LimitWrapper>
            )}
            <Editor
              editorState={editorState}
              toolbarClassName="draft-editor-toolbar"
              editorClassName="draft-editor-container"
              onEditorStateChange={onEditorStateChange}
              onBlur={onBlurAction}
              placeholder={placeholder}
              editorRef={forwardedRef}
              editorKey={editorKey}
              handlePastedText={handlePastedText}
              handleBeforeInput={(input: string) => {
                if (!maxLength) return

                const contentLength = editorState.getCurrentContent().getPlainText().length
                if (input && contentLength >= maxLength) {
                  return 'handled'
                }
              }}
              toolbar={{
                options: ['inline', 'list', 'link'],
                inline: {
                  options: ['bold', 'italic']
                },
                list: {
                  options: ['unordered', 'ordered']
                }
              }}
              readOnly={disabled}
              {...editorProps}
            />
          </Wrapper>
        </div>
      </Box>
    )
  }
)

export default RichTextEditor
