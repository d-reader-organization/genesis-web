'use client'

import React from 'react'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react'
import { Project } from '@/models/project'

type Props = {
  title: Project['title']
  banner: Project['banner']
  cover: Project['cover']
}

export const ProjectBanner: React.FC<Props> = ({ title, banner, cover }) => {
  return (
    <div className='flex flex-col w-full h-[300px] md:h-[550px]'>
      <div className='relative w-full h-full'>
        <Image
          src={banner}
          alt={title + ' Banner'}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          className='max-sm:hidden md:rounded-xl shadow-lg'
        />
        <Image
          src={cover}
          alt={title + ' Cover'}
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
