'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { CommonDialogProps } from '@/models/common'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import Link from 'next/link'
import { useCountdown } from '@/hooks/useCountdown'
import { Text } from '@/components/ui'

type Props = {
  expirationDate: Date
} & CommonDialogProps

export const ExpressedInterestDialog: React.FC<Props> = ({ open, toggleDialog, expirationDate }) => {
  const { seconds } = useCountdown({ expirationDate: expirationDate.toString() })
  setTimeout(() => toggleDialog(), 5 * 1000)

  return (
    <>
      <Dialog open={open} onOpenChange={toggleDialog}>
        <DialogContent
          aria-describedby=''
          className='h-full w-full bg-transparent overflow-hidden focus:outline-none'
          showCloseIcon={false}
        >
          <Realistic autorun={{ speed: 0.5, duration: 1000 }} />
          <div className='max-w-[485px] m-auto h-fit rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'>
            <DialogTitle className='font-satoshi leading-[24px] text-xl'>
              Thank you for expressing interest !
            </DialogTitle>
            <Link
              href={''}
              target='_blank'
              className='w-max self-center box-border border-2 border-black p-2 bg-white text-black rounded-lg font-medium cursor-pointer'
            >
              Share on &#120143;
            </Link>
            <Text as='p' styleVariant='body-xsmall'>
              Redirect in {seconds} s
            </Text>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
