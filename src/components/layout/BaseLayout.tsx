import React from 'react'
import { Navigation } from './Navigation'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Footer } from './Footer'
import Script from 'next/script'
import { IntercomClient } from '@/components/shared/IntercomClient'

type Props = React.PropsWithChildren & { showFooter?: boolean }

export const BaseLayout: React.FC<Props> = async ({ children, showFooter = false }) => {
  const me = await fetchMe()
  return (
    <div className='flex flex-col min-h-screen'>
      <Navigation me={me} />
      <main className='flex flex-col w-full h-full items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8 xs:pb-24 sm:pb-24 md:pb-24 lg:pb-24 flex-1'>
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <Script
        strategy='afterInteractive'
        id='intercom-settings'
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "wfqufkpe"
            };
          `,
        }}
      />
      <IntercomClient />
    </div>
  )
}
