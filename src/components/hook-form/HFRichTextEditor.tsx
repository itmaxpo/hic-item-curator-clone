import { Control, Controller } from 'react-hook-form'
import get from 'lodash/get'
import { StyledRichTextEditor } from 'components/RichTextEditor'
import { useHFContext } from './HookForm'

import type React from 'react'
import { FormItem } from '@tourlane/tourlane-ui'

interface Props extends React.ComponentProps<any> {
  name: string
  control?: Control
}

export const HFRichTextEditor = ({ control, name, disabled, label, ...props }: Props) => {
  const formCtx = useHFContext()

  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      defaultValue=""
      render={({ value, ...field }) => (
        <FormItem
          name={name}
          label={label}
          error={get(formCtx?.form.formState.errors, name)?.message}
        >
          <StyledRichTextEditor
            disabled={disabled ?? formCtx?.disabled}
            value={value ?? ''}
            {...props}
            {...field}
          />
        </FormItem>
      )}
    />
  )
}
