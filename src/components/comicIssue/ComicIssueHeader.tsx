import React, { PropsWithChildren } from 'react'

export const ComicIssueHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col justify-center md:flex-row-reverse gap-2 md:gap-8 max-w-screen-xl -mt-12 md:mt-0 md:pt-8'>
      {children}
    </div>
  )
}
