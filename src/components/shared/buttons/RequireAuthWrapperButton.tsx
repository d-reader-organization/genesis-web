'use client'

import { fetchMe } from '@/app/lib/api/user/queries'
import { Button, type ButtonProps } from '@/components/ui/Button'
import { useState, type MouseEvent } from 'react'
import { RequireAuthDialog } from '../dialogs/RequireAuthenticationDialog'

type Props = React.PropsWithChildren &
  ButtonProps & { onClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void }

export const RequireAuthWrapperButton: React.FC<Props> = ({ children, onClick, ...props }) => {
  const [showRequireAuthDialog, setShowRequireAuthDialog] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const submitWrapper = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!onClick || isDisabled) {
      return
    }
    setIsDisabled(true)
    const me = await fetchMe()
    if (!me) {
      setIsDisabled(false)
      setShowRequireAuthDialog(true)
      return
    }
    await onClick(event)
    setIsDisabled(false)
  }
  return (
    <>
      <Button {...props} onClick={submitWrapper} aria-disabled={isDisabled} disabled={isDisabled}>
        {children}
      </Button>
      <RequireAuthDialog
        closeDialog={() => {
          setShowRequireAuthDialog(false)
        }}
        showDialog={showRequireAuthDialog}
      />
    </>
  )
}
