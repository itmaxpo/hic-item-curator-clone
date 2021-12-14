import { createContext, useContext, DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react'
import type { FieldName, UseFormReturn, Path } from 'react-hook-form'

type HtmlFormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface IHFContextValue<T = any> {
  form: UseFormReturn<T>
  disabled?: boolean
}

export const REQUIRED_ERROR_MESSAGE = 'The field is required'

const Context = createContext<IHFContextValue | undefined>(undefined)

export const useHFContext = () => useContext(Context)

interface Props<T = any> extends Omit<HtmlFormProps, 'onSubmit'>, IHFContextValue<T> {
  onSubmit?: (data: T, helpers: ReturnType<typeof createHelpers>) => void
  children: ReactNode
}

export function createHelpers<T>(form: UseFormReturn<T>) {
  return {
    setErrors(errors: Record<FieldName<T>, string>) {
      Object.entries<string>(errors).forEach(([fieldName, message], i) =>
        form.setError(
          fieldName as Path<T>,
          {
            type: 'manual',
            message: message
          },
          {
            shouldFocus: i === 0
          }
        )
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
