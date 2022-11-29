import { FC } from 'react'
import { HFRichTextEditor } from './HFRichTextEditor'

export const HFRichTextEditorConfigured: FC<{
  name: string
  label?: string
  required?: boolean
}> = ({ name, label, required }) => (
  <HFRichTextEditor
    name={name}
    label={label}
    required={required}
    resizable
    editorProps={{
      toolbar: {
        options: ['inline', 'list'],
        inline: {
          options: ['bold']
        },
        list: {
          options: ['unordered']
        }
      }
    }}
  />
)
