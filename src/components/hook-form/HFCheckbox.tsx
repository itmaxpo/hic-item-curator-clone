import { ComponentProps } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Checkbox, Label } from '@tourlane/tourlane-ui'
import { useHFContext } from './HookForm'

interface Props extends ComponentProps<typeof Checkbox> {
  name: string
  label: string
  control?: Control
  defaultValue?: any
}

export const HFCheckbox = ({ name, label, control, disabled, ...props }: Props) => {
  let formCtx = useHFContext()

  disabled = disabled ?? formCtx?.disabled

  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      defaultValue={false}
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <Label disabled={disabled}>
            <Checkbox
              disabled={disabled}
              checked={value}
              onChange={(e: any) => onChange(e.target.checked)}
              {...fieldProps}
              {...props}
            />
            {label}
          </Label>
        )
      }}
    />
  )
}
