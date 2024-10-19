import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import React from 'react'
import { Button } from '@/components/ui'

export const EducationalVideoDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => {

  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby=''
        className='bg-transparent rounded:[32px] sm:rounded-[64px] flex flex-col items-center'
        overlayClassName='bg-transparent'
        showCloseIcon={false}
      >
        {/* <DialogTitle className='sr-only'>Confirming transaction...</DialogTitle> */}
        <iframe
            src="https://www.youtube.com/embed/og1LPg7bt7o"
            frameBorder="0"
            allowFullScreen
            height={300}
            className='max-w-[600px] w-full'
        />
        <Button className='max-w-[600px] w-full' variant='destructive' onClick={toggleDialog}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}
