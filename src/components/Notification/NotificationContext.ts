import React from 'react'

export default React.createContext<{
  enqueueNotification: (n: {
    message: React.ReactNode | string
    variant?: 'default' | 'error' | 'alarm'
    type?: 'block'
    borderDirection?: 'bottom' | 'left'
    onClose?: () => void
  }) => (runOnClose?: boolean) => void
  closeNotification: (key: string) => void
}>({} as any)
