import React, { useCallback, useRef, useState } from 'react'
import { EditorState, Modifier, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { get } from 'lodash'
import cuid from 'cuid'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import './styles.css'
import { StyledLabel, Wrapper } from './styles'
import { getRichTextValue } from 'utils/helpers'

const isHTML = str => {
  const doc = new DOMParser().parseFromString(str, 'text/html')
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1)
}

/**
 * Handle logic related to editor status.
 *
 * Takes the external props 'value' and 'onChange'
 * Returns props that need to be passed to the Editor.
 */
const useEditorState = ({ value, onChange }) => {
  // Generate an EditorState object from a provided value
  const getInitialEditorState = useCallback(value => {
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
  }, [])

  // Keep track of editor state
  const [editorState, setEditorState] = useState(() => getInitialEditorState(value))

  // Handle editor state change
  const onEditorStateChange = useCallback(
    editorState => {
      // Update editor state
      setEditorState(editorState)

      // Send current HTML to callback
      if (onChange) {
        const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        onChange(htmlValue)
      }
    },
    [onChange]
  )

  return { editorState, onEditorStateChange }
}

/**
 * Handle logic related to editor focus.
 * 'handleWrapperClick' should be passed to the Wrapper and 'editorRef' to the Editor.
 */
const useEditorFocus = () => {
  const editorRef = useRef(null)

  const handleWrapperClick = useCallback(() => {
    const focus = get(editorRef.current, 'editor.focus')
    if (focus) {
      focus()
    }
  }, [])

  return { editorRef, handleWrapperClick }
}

/**
 * Handle logic related to editor pasting rich text.
 * Returns props that need to be passed to the Editor.
 */
const useEditorPaste = () => {
  // Generate a unique editorKey that should be unique per-editor
  const editorKey = useRef(cuid()).current

  // Optionally handle pasted text, instead of using the default Draft.js behavior.
  // This is needed to handle extra blank lines generated in Windows.
  const handlePastedText = useCallback(
    (text, html, editorState, onChange) => {
      if (html) {
        // If the editorKey is present in the pasted HTML, it should be safe to
        // assume this is an internal paste.
        // If so, it's better to return false to fallback to the default behavior. This allows to
        // better preserve styling.
        const hasEditorKey = html.indexOf(editorKey) !== -1
        if (hasEditorKey) {
          return false
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
      }

      // if this is not a rich text paste, we also fallback to default behavior.
      return false
    },
    [editorKey]
  )

  return { editorKey, handlePastedText }
}

const RichTextEditor = ({
  className,
  placeholder,
  value,
  onChange,
  textWrap = true,
  resizable = false,
  label,
  ...otherProps
}) => {
  const { editorState, onEditorStateChange } = useEditorState({ value, onChange })
  const { editorRef, handleWrapperClick } = useEditorFocus()
  const { editorKey, handlePastedText } = useEditorPaste()

  const onBlurAction = () => {
    // If onBlur function provided, return html
    if (otherProps.onBlur) {
      const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      return otherProps.onBlur(htmlValue)
    }
  }

  return (
    <div className={className}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div>
        <Wrapper
          onClick={handleWrapperClick}
          textWrap={textWrap}
          resizable={resizable}
          {...otherProps}
        >
          <Editor
            editorState={editorState}
            toolbarClassName="draft-editor-toolbar"
            editorClassName="draft-editor-container"
            onEditorStateChange={onEditorStateChange}
            onBlur={onBlurAction}
            placeholder={placeholder}
            ref={editorRef}
            editorKey={editorKey}
            handlePastedText={handlePastedText}
            toolbar={{
              options: ['inline', 'list', 'link'],
              inline: {
                options: ['bold', 'italic']
              },
              list: {
                options: ['unordered', 'ordered']
              }
            }}
          />
        </Wrapper>
      </div>
    </div>
  )
}

export default RichTextEditor
