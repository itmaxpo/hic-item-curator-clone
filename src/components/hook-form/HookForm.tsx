import { createContext, useContext } from 'react'

import type { FieldName, UseFormMethods } from 'react-hook-form'
import type React from 'react'

type HtmlFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

interface IHFContextValue<T = any> {
  form: UseFormMethods<T>
  disabled?: boolean
}

const Context = createContext<IHFContextValue | undefined>(undefined)

export const useHFContext = () => useContext(Context)

interface Props<T = any> extends Omit<HtmlFormProps, 'onSubmit'>, IHFContextValue<T> {
  onSubmit?: (data: T, helpers: ReturnType<typeof createHelpers>) => void
  children: React.ReactNode
}

export function createHelpers<T>(form: UseFormMethods<T>) {
  return {
    setErrors(errors: Record<FieldName<T>, string>) {
      Object.entries(errors).forEach(([fieldName, message], i) =>
        form.setError(fieldName as FieldName<T>, {
          type: 'manual',
          message: message as string,
          shouldFocus: i === 0
        })
      )
    }
  }
}

export const HookForm = ({ onSubmit, children, form, disabled, ...props }: Props) => (
  <Context.Provider value={{ form, disabled }}>
    <form
      {...props}
      onSubmit={form.handleSubmit((formData) => onSubmit?.(formData, createHelpers(form)))}
    >
      {children}
    </form>
  </Context.Provider>
)
