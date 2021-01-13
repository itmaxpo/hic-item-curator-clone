import { createContext, useContext } from 'react'

import type { UseFormMethods } from 'react-hook-form'
import type { ReactNode } from 'react'

interface Props<T = any> {
  form: UseFormMethods<T>
  disabled?: boolean
  onSubmit: (data: T, helpers: { setErrors: (errors: Record<keyof T, string>) => void }) => void
  children: ReactNode
}

const Context = createContext<Omit<Props, 'onSubmit' | 'children'> | undefined>(undefined)

export const useHFContext = () => useContext(Context)

export const HookForm = ({ onSubmit, children, ...props }: Props) => (
  <Context.Provider value={props}>
    <form
      onSubmit={props.form.handleSubmit((formData) =>
        onSubmit(formData, {
          setErrors(errors) {
            Object.entries(errors).forEach(([fieldName, message], i) =>
              props.form.setError(fieldName, { type: 'manual', message, shouldFocus: i === 0 })
            )
          }
        })
      )}
    >
      {children}
    </form>
  </Context.Provider>
)
