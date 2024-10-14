import React from 'react'

type ProjectHeaderProps = {
  title: string
  subtitle: string
  className?: string
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <div className={'flex flex-col justify-start items-start py-4 md:justify-center md:items-center gap-4 md:pb-[34px] ' + className}>
      <h1 className='text-white font-semibold tracking-tight leading-none text-2xl md:text-[40px]'>{title}</h1>
      <p className='text-white text-2xl md:text-base font-medium leading-snug'>{subtitle}</p>
    </div>
  )
}
