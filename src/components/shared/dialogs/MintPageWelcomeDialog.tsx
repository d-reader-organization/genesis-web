'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { Button } from '@/components/ui'
import { useLocalStorage, useToggle } from '@/hooks'
import { Text } from '@/components/ui'
import { LOCAL_STORAGE } from '@/constants/localStorage'

export const MintPageWelcomeDialog: React.FC = () => {
  const [isMintPageVisited, setIsMintPageVisited] = useLocalStorage(LOCAL_STORAGE.IS_MINT_PAGE_VISITED, false)
  const [mintPageWelcomeDialog, toggleMintPageWelcomeDialog] = useToggle(!isMintPageVisited)

  const onClick = () => {
    toggleMintPageWelcomeDialog()
    setIsMintPageVisited(true)
  }

  return (
    <Dialog open={mintPageWelcomeDialog} onOpenChange={toggleMintPageWelcomeDialog}>
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'
        showCloseIcon={false}
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Welcome to dReader!</DialogTitle>
        <div className='flex flex-col gap-2 w-full'>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>✊</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Spread the word!
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Be a chad and click the &apos;Share on 𝕏&apos; button after minting. The post will tag relevant artists
                and you&apos;ll make their day!
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>💸</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Protocol fees
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Buying a collectible on Solana can incur fees on top of the price you pay. In our case that&apos;s
                ~0.0033 SOL (50 cents)
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>🎁</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Use discounts!
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Registered users and digital collectors sometimes get discounts! Check your eligibility before buying.
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>🚧</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                App is under construction
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                We&apos;re rolling out new screens and features bi-weekly. Expect new interface and experience
                improvements!
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
