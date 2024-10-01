import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import CHECK_CIRCLE_ICON from 'public/assets/vector-icons/check-circle.svg'

export const CouponDescriptionDialog: React.FC<CommonDialogProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby=''
        className='bg-grey-400 rounded:[12px] rounded-[12px] flex flex-col items-center w-[80%] sm:w-[485px] overflow-hidden'
        overlayClassName='bg-transparent'
        showCloseIcon={false}
      >
        <DialogTitle className=''>Check Eligibilty</DialogTitle>
       <div className='rounded:[12px] sm:rounded-[12px] bg-grey-500 p-[10px] gap-[16px] flex flex-row w-[100%] max-w-[437px]'>
        <div><CHECK_CIRCLE_ICON /></div>
        <div className='text-base'>
            <p className='font-bold'>Registered Users -15% off</p>
            <p className='font-medium'>Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet.</p>
            <p>Register →</p>
        </div>
       </div>

       <div>
        <p>Registered Users -15% off</p>
        <p>Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet.
        Register →
        </p>
       </div>

       <div>
        <p>Registered Users -15% off</p>
        <p>Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet.
        Register →
        </p>
       </div>

       <div>
        <p>Registered Users -15% off</p>
        <p>Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet, Lorem Ipsum dolor sit amet.
        Register →
        </p>
       </div>
      </DialogContent>
    </Dialog>
  )
}