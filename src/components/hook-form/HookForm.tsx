import { createContext, useContext } from 'react'

import type { UseFormMethods } from 'react-hook-form'
import type React from 'react'

type HtmlFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

interface Props<T = any> extends Omit<HtmlFormProps, 'onSubmit'> {
  form: UseFormMethods<T>
  disabled?: boolean
  onSubmit: (data: T, helpers: { setErrors: (errors: Record<keyof T, string>) => void }) => void
  children: React.ReactNode
}

const Context = createContext<Omit<Props, 'onSubmit' | 'children'> | undefined>(undefined)

export const useHFContext = () => useContext(Context)

export const HookForm = ({ onSubmit, children, form, disabled, ...props }: Props) => (
  <Context.Provider value={{ form, disabled }}>
    <form
      {...props}
      onSubmit={form.handleSubmit((formData) =>
        onSubmit(formData, {
          setErrors(errors) {
            Object.entries(errors).forEach(([fieldName, message], i) =>
              form.setError(fieldName, { type: 'manual', message, shouldFocus: i === 0 })
            )
          }
        })
      )}
    >
      {children}
    </form>
  </Context.Provider>
)
