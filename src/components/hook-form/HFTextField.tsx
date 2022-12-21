import { Control, Controller } from 'react-hook-form'
import get from 'lodash/get'
import { ErrorType, TextField } from '@tourlane/tourlane-ui'
import { REQUIRED_ERROR_MESSAGE, useHFContext } from './HookForm'

import type React from 'react'

interface Props extends React.ComponentProps<typeof TextField> {
  name: string
  control?: Control
  required?: boolean
}

export const HFTextField = ({ control, name, disabled, required = false, ...props }: Props) => {
  let formCtx = useHFContext()
  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      rules={{ required: required ? REQUIRED_ERROR_MESSAGE : '' }}
      defaultValue=""
      render={({ field: { value, ...fieldProps } }) => (
        <TextField
          disabled={disabled ?? formCtx?.disabled}
          error={get(formCtx?.form.formState.errors, name)?.message as ErrorType}
          hideErrorOnFocus={false}
          value={value ?? ''}
          {...fieldProps}
          {...props}
        />
      )}
    />
  )
}
