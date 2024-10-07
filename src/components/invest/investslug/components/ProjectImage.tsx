import React from 'react'
import TransparentPlayButton from './TransparentPlayButton'

type ProjectImageProps = {
  backgroundImageUrl: string
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ backgroundImageUrl }) => {
  return (
    <div
      className='flex flex-col h-[550px] gap-4 md:gap-6 bg-cover bg-center bg-no-repeat rounded-xl shadow justify-center items-center'
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <TransparentPlayButton />
    </div>
  )
}
