import { Control, Controller } from 'react-hook-form'
import get from 'lodash/get'
import { TextField } from '@tourlane/tourlane-ui'
import { useHFContext } from './HookForm'

import type React from 'react'

interface Props extends React.ComponentProps<typeof TextField> {
  name: string
  control?: Control
}

export const HFTextField = ({ control, name, disabled, ...props }: Props) => {
  let formCtx = useHFContext()

  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      defaultValue=""
      render={({ value, ...field }) => (
        <TextField
          disabled={disabled ?? formCtx?.disabled}
          error={get(formCtx?.form.formState.errors, name)?.message}
          hideErrorOnFocus={false}
          value={value ?? ''}
          {...props}
          {...field}
        />
      )}
    />
  )
}
