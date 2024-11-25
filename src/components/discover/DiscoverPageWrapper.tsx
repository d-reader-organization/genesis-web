import React from 'react'
import { Tabs } from '@/components/shared/Tabs'
import { DiscoverFilterBar } from './DiscoverFilterBar'
import { cn } from '@/lib/utils'
import { DISCOVER_TABS } from '@/constants/tabs'
import { DiscoverFilterStoreProvider } from '@/providers/DiscoverFilterStoreProvider'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Navigation } from '../layout/Navigation'

type Props = React.PropsWithChildren & { mainClassName?: string }

export const DiscoverWrapper: React.FC<Props> = async ({ children, mainClassName }) => {
  const me = await fetchMe()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navigation me={me} hideSearch />
      <main
        className={cn(
          'flex flex-col w-full h-full items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8 xs:pb-24 sm:pb-24 md:pb-24 lg:pb-24 flex-1',
          mainClassName
        )}
      >
        <div className={cn('flex flex-col max-w-screen-xl w-full gap-3')}>
          <DiscoverFilterStoreProvider>
            <Tabs label={'Discover'} tabs={DISCOVER_TABS} />
            <DiscoverFilterBar />
            {children}
          </DiscoverFilterStoreProvider>
        </div>
      </main>
    </div>
  )
}
