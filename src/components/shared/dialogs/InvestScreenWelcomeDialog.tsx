'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import CHECK_CIRCLE_ICON from 'public/assets/vector-icons/check-circle.svg'
import { Button } from '@/components/ui'
import { useLocalStorage, useToggle } from '@/hooks'
import { Text } from '@/components/ui'
import { LOCAL_STORAGE } from '@/constants/localStorage'

export const InvestScreenWelcomeDialog: React.FC = () => {
  const [isInvestmentDisclaimerRead, setIsInvestmentDisclaimerRead] = useLocalStorage(
    LOCAL_STORAGE.IS_INVESTMENT_DISCLAIMER_READ,
    false
  )
  const [investScreenWelcomeDialog, toggleInvestScreenWelcomeDialog] = useToggle(!isInvestmentDisclaimerRead)

  const onClick = () => {
    toggleInvestScreenWelcomeDialog()
    setIsInvestmentDisclaimerRead(true)
  }

  return (
    <Dialog open={investScreenWelcomeDialog} onOpenChange={toggleInvestScreenWelcomeDialog}>
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-8'
        showCloseIcon={false}
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Welcome to Genesis!</DialogTitle>
        <div className='flex flex-col gap-2 w-full'>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>
              <CHECK_CIRCLE_ICON />
            </div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                App is still in beta
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                We&apos;re currently gathering interest to see how many people want to invest into stories! App has
                limited features.
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>
              <CHECK_CIRCLE_ICON />
            </div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Affiliation disclosure
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Visuals in the app don&apos;t equal to partnership. Read the details of each campaign to understand if
                the story is fan-made or endorsed by some brand.
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>
              <CHECK_CIRCLE_ICON />
            </div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Legal & compliance
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Legal foundation for Genesis isn&apos;t yet fully laid out. You can express interest to invest into
                stories (IPs) but investing and token issuing is disabled at the moment.
              </Text>
            </div>
          </div>
        </div>
        <Button variant='secondary' className='rounded-[16px] font-bold text-base w-full' onClick={onClick}>
          I understand!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
