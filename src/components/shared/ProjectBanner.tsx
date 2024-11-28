'use client'

import React from 'react'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'

type ProjectBannerProps = {
  title: string
  banner: string
  cover: string
}

export const ProjectBanner: React.FC<ProjectBannerProps> = ({ banner, cover }) => {
  return (
    <div className='flex flex-col w-full h-[300px] md:h-[550px]'>
      <div className='relative w-full h-full'>
        <Image
          src={banner}
          alt=''
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          className='max-sm:hidden md:rounded-xl shadow-lg'
        />
        <Image
          src={cover}
          alt=''
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className='sm:hidden shadow-lg'
        />
        <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
          <div className='flex p-8 bg-black bg-opacity-30 rounded-full shadow-lg backdrop-blur-lg'>
            <PlayIcon fill='white' className='cursor-pointer h-8 w-8' />
          </div>
        </div>
      </div>
    </div>
  )
}
