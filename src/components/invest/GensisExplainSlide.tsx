'use client'

import React from 'react'
import { Text } from '../ui'
import { PlayIcon } from 'lucide-react'
import { useToggle } from '@/hooks'
import { YoutubeVideoDialog } from '../shared/dialogs/YoutubeVideoDialog'

export const GenesisExplainSlide: React.FC = () => {
  const [showYtDialog, toggleYtDialog] = useToggle()
  return (
    <>
      <div className='mt-20 md:mt-16 bg-black'>
        <div className='relative max-w-[1600px] mx-auto'>
          <div className='relative max-w-[820px] lg:max-w-[1300px]'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
              <PlayIcon fill='white' className='cursor-pointer h-20 w-20 opacity-80' onClick={toggleYtDialog} />
            </div>
            <iframe
              src='https://www.youtube.com/embed/QjdGuCf6n08?si=U4t2m5yPnwgVLvwG&autoplay=1&mute=1&controls=0&loop=1&playlist=QjdGuCf6n08&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&vq=hd720'
              className='w-full h-auto aspect-video pointer-events-none'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              title='Genesis promotional video'
              referrerPolicy='strict-origin-when-cross-origin'
            />
            <div className='max-sm:hidden pointer-events-none absolute top-0 right-0 min-w-[250px] xl:min-w-[250px] h-full bg-gradient-to-l from-[#000000] to-transparent' />
          </div>
          <div className='absolute top-0 right-0 p-2 max-w-96 flex flex-col justify-center items-center gap-2 z-2 text-center h-full max-md:hidden bg-gradient-to-l from-[#000000] to-transparent'>
            <Text as='h3' styleVariant='primary-heading'>
              Scout & Invest into the future of storytelling
            </Text>
            <Text as='p' styleVariant='body-large'>
              Join the community of investors by supporting original stories that will change the world.
            </Text>
          </div>
        </div>
      </div>
      <YoutubeVideoDialog
        open={showYtDialog}
        toggleDialog={toggleYtDialog}
        videoUrl={'https://www.youtube.com/embed/QjdGuCf6n08?si=U4t2m5yPnwgVLvwG'}
      />
    </>
  )
}
