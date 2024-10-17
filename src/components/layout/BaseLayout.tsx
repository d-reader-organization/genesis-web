import React from 'react'
import { Navigation } from './Navigation'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Footer } from './Footer'

type Props = React.PropsWithChildren & { showFooter?: boolean }

export const BaseLayout: React.FC<Props> = async ({ children, showFooter = false }) => {
  const me = await fetchMe()
  return (
    <>
      <Navigation me={me} />
      <main className='flex flex-col w-full h-full items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8'>{children}</main>
      {showFooter ? <Footer /> : null}
    </>
  )
}
