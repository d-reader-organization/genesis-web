import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useRequestUserEmailVerification } from '@/api/user/queries/useRequestUserEmailVerification'

type Props = {
  onClose: () => void
}

export const EmailVerificationDialog: React.FC<Props> = ({ onClose }) => {
  // use actions?
  const { mutateAsync: requestUserEmailVerification } = useRequestUserEmailVerification()
  return (
    <Dialog>
      <DialogContent className='sm:max-w-[444px] p-4 text-lg bg-grey-600'>
        <strong>📖 Email not verified</strong>
        Verify your email to be eligible for a free mint
        <small>Didn&apos;t get the email? check your spam folder{/* before resending */}</small>
        <Button
          className='justify-start pl-0'
          onClick={async () => {
            await requestUserEmailVerification()
            onClose()
          }}
          variant='link'
        >
          Resend email confirmation link
        </Button>
      </DialogContent>
    </Dialog>
  )
}
