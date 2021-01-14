import { Control, Controller } from 'react-hook-form'
import { Dropdown } from '@tourlane/tourlane-ui'

import type React from 'react'
import { useHFContext } from './HookForm'

interface Props extends React.ComponentProps<typeof Dropdown> {
  name: string
  control?: Control
}

export const HFDropdown = ({ control, name, disabled, ...props }: Props) => {
  let form = useHFContext()

  return (
    <Controller
      control={control ?? form?.form.control}
      name={name}
      defaultValue={props.multiple ? [] : null}
      render={(field) => (
        <Dropdown data-test={name} disabled={disabled ?? form?.disabled} {...props} {...field} />
      )}
    />
  )
}
