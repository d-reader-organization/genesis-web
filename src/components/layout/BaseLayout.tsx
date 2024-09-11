import React from 'react'
import { Navigation } from './Navigation'

type Props = React.PropsWithChildren

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className='flex flex-col w-full h-full items-center md:mt-36'>{children}</main>
    </>
  )
}
