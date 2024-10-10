import React from 'react'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'

type ProjectImageProps = {
  image: string
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ image }) => {
  return (
    <div className='flex flex-col w-full h-[550px] gap-4 md:gap-6 rounded-xl shadow'>
      <div className='relative w-full h-full'>
        <Image
          src={image}
          alt='Project Background'
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          className='rounded-xl shadow-lg'
        />
        <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
          <div className='flex p-7 bg-black bg-opacity-30 rounded-full shadow-lg backdrop-blur-lg'>
            <PlayIcon fill='white' className='size-16 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}
