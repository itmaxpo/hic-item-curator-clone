import type React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Checkbox, Label } from '@tourlane/tourlane-ui'
import { useHFContext } from './HookForm'

interface Props extends React.ComponentProps<typeof Checkbox> {
  name: string
  label: string
  control?: Control
}

export const HFCheckbox = ({ name, label, control, disabled, ...props }: Props) => {
  let formCtx = useHFContext()

  disabled = disabled ?? formCtx?.disabled

  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      defaultValue={false}
      render={({ value, onChange, ...field }) => {
        return (
          <Label disabled={disabled}>
            <Checkbox
              disabled={disabled}
              {...props}
              checked={value}
              onChange={(e: any) => onChange(e.target.checked)}
              {...field}
            />
            {label}
          </Label>
        )
      }}
    />
  )
}
