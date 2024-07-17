'use client'

import { ResetPasswordForm } from '@/components/form/ResetPasswordForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import useToggle from '@/hooks/useToggle'

type Props = {
  open: boolean
}

export const UnwrapWarningDialog: React.FC<Props> = ({ open }) => {
  const [passwordDialogOpen, togglePasswordDialog] = useToggle(open)
  return (
    <Dialog open={passwordDialogOpen} onOpenChange={togglePasswordDialog}>
      <DialogContent className='sm:max-w-[444px] p-0 '>
        <DialogHeader className='p-4'>
          <DialogTitle>Unwrap warning dialog</DialogTitle>
          <DialogDescription>TODO</DialogDescription>
        </DialogHeader>
        <ResetPasswordForm onClose={togglePasswordDialog} />
      </DialogContent>
    </Dialog>
  )
}
