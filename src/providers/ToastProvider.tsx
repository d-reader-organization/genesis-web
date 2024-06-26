'use client'

import { useState, useMemo, useCallback, createContext, useContext } from 'react'

import { Alert } from '@/components/ui'
import { FieldValues, FieldErrors } from 'react-hook-form'
import axios, { AxiosError } from 'axios'

type AlertColor = 'success' | 'info' | 'warning' | 'error' // TODO create proper colors or Variants inside Alert component

interface Toast {
  message: React.ReactNode
  severity?: AlertColor
  isOpen: boolean
  duration: number | null
}

interface ToastContextState {
  add: (message: React.ReactNode, severity: AlertColor) => void
  confirmingTransactions: VoidFunction
  uploadingFiles: VoidFunction
  onQueryError: (error: Error) => void
  onFormError: <T extends FieldValues = FieldValues>(errors: FieldErrors<T>) => void
}

const initialContextValue: ToastContextState = {
  add: () => {},
  confirmingTransactions: () => {},
  uploadingFiles: () => {},
  onQueryError: () => {},
  onFormError: () => {},
}

export const ToastContext = createContext<ToastContextState>(initialContextValue)

const defaultAutoHideDuration = 4000

export const initialToastState: Toast = {
  message: '',
  severity: undefined,
  isOpen: false,
  duration: defaultAutoHideDuration,
}

// TODO refactor this to use shadcn Toast component
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState(initialToastState)

  const add = useCallback((message: React.ReactNode, severity: AlertColor, duration = defaultAutoHideDuration) => {
    setToast({ message: message || '', severity, isOpen: true, duration })
  }, [])

  const confirmingTransactions = useCallback(() => {
    setToast({ message: 'Confirming transaction(s)', severity: 'info', isOpen: true, duration: null })
  }, [])

  const uploadingFiles = useCallback(() => {
    setToast({ message: 'Uploading file(s)', severity: 'info', isOpen: true, duration: null })
  }, [])

  // const remove = () => {
  //   setToast((prevToast) => ({ ...prevToast, isOpen: false, duration: defaultAutoHideDuration }))
  // }

  const onFormError = useCallback(
    <T extends FieldValues = FieldValues>(errors: FieldErrors<T>) => {
      const [, errorValue] = Object.entries(errors)[0]
      if (errorValue?.message) {
        add(<>{errorValue.message}</>, 'error')
      }
    },
    [add]
  )

  const onQueryError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any | AxiosError<any>) => {
      let message = ''
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message
      } else {
        if (Array.isArray(error?.message)) {
          message = error.message.join(', ')
        } else message = error?.message
      }

      add(message, 'error')
    },
    [add]
  )

  const value = useMemo(
    () => ({ add, confirmingTransactions, uploadingFiles, onQueryError, onFormError }),
    [add, confirmingTransactions, uploadingFiles, onQueryError, onFormError]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Alert
        //   variant='filled'
        style={{ alignItems: 'center' }}
        // TODO add icon support
        //   icon={toast.duration === null ? <CircularProgress /> : undefined}
      >
        {toast.message}
      </Alert>
    </ToastContext.Provider>
  )
}

export default ToastProvider

export const useToaster = (): ToastContextState => useContext(ToastContext)
