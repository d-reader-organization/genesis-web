import React from 'react'
import { Navigation } from './Navigation'

type Props = React.PropsWithChildren

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className='flex flex-col w-full h-full items-center md:mt-36 p-0 sm:p-4 md:p-6 lg:p-8'>{children}</main>
    </>
  )
}
