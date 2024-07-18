import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useRequestUserEmailVerification } from '@/api/user/queries/useRequestUserEmailVerification'
import { CommonDialogProps } from '@/models/common'

export const EmailVerificationDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => {
  // use actions?
  const { mutateAsync: requestUserEmailVerification } = useRequestUserEmailVerification()
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='sm:max-w-[444px] p-4 text-lg bg-grey-600'>
        <strong>📖 Email not verified</strong>
        Verify your email to be eligible for a free mint
        <small>Didn&apos;t get the email? check your spam folder{/* before resending */}</small>
        <Button
          className='justify-start pl-0'
          onClick={async () => {
            await requestUserEmailVerification()
            toggleDialog()
          }}
          variant='link'
        >
          Resend email confirmation link
        </Button>
      </DialogContent>
    </Dialog>
  )
}
