import { cn } from '@/utils/general'
import React from 'react'
import { Project } from '@/models/project'

type Props = {
  title: Project['title']
  subtitle: Project['subtitle']
  className?: string
}

export const ProjectHeader: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start gap-4 py-6 pl-2 md:py-0 md:pt-2 md:justify-center md:items-center md:pl-0 md:pb-[34px]',
        className
      )}
    >
      <h1 className='text-white text-2xl font-semibold leading-normal tracking-tight md:tracking-tight md:leading-none md:text-[40px] font-obviouslyNarrow'>
        {title}
      </h1>
      <p className='text-white text-sm font-medium leading-tight md:leading-snug md:text-base'>{subtitle}</p>
    </div>
  )
}
