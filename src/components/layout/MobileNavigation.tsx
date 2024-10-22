import { RoutePath } from '@/enums/routePath'
import DReaderSymbol from 'public/assets/vector-icons/logo.svg'
import { ButtonLink } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, Search, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { User } from '@/models/user'
import React from 'react'
import { ProfileWidget } from '../shared/ProfileWidget'
import { LogoutButton } from '../shared/buttons/LogoutButton'
import { ProductSocials } from '../shared/ProductSocials'
import { SearchInput } from '../shared/SearchInput'
import { usePathname } from 'next/navigation'

type Props = {
  user?: User | null
}

export const MobileNav: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false)

  const pathname = usePathname()
  const isInvest = pathname.startsWith(RoutePath.Invest)
  const isLibrary = pathname.startsWith(RoutePath.Library)
  return (
    <>
      <div
        className={cn(
          'fixed top-0 z-50 w-full md:hidden h-full bg-grey-600 bg-opacity-85 backdrop-blur-[25px]',
          isOpen ? 'max-h-full' : 'max-h-20'
        )}
      >
        {isSearchOpen ? (
          <div className={cn('flex items-center gap-6 h-20 px-4')}>
            <SearchInput className='w-full' />
            <button onClick={() => setIsSearchOpen(false)}>
              <X className='size-[18px]' />
            </button>
          </div>
        ) : (
          <>
            <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={24} />
              </button>
              <Link href={RoutePath.Home}>
                <DReaderSymbol className='size-6 fill-white' />
              </Link>
              <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>

            <div className='md:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTitle className='sr-only'>Open menu</SheetTitle>
                <SheetContent aria-describedby={undefined} side='right' className='w-full bg-grey-600 p-4 border-l-0'>
                  <nav className='flex flex-col justify-between size-full text-grey-100 text-2xl font-bold leading-[28.8px]'>
                    <div className='flex flex-col gap-8'>
                      <div className='flex justify-between w-full'>
                        {/* <Link href={RoutePath.Discover}>Discover</Link> */}
                        <Link className={cn(isInvest ? 'text-yellow-500' : '')} href={RoutePath.Invest}>
                          Invest
                        </Link>
                        <button onClick={() => setIsOpen(false)}>
                          <X className='size-6 text-grey-100' />
                        </button>
                      </div>
                    </div>
                    {user ? (
                      <div className='flex flex-col gap-10 border-t border-t-grey-400'>
                        <ProfileWidget user={user} />
                        <div className='flex flex-col gap-8'>
                          <Link className={cn(isLibrary ? 'text-yellow-500' : '')} href={RoutePath.Library}>
                            My Library
                          </Link>
                          <Link href={RoutePath.Profile}>Settings</Link>
                        </div>
                        <LogoutButton />
                        <ProductSocials />
                      </div>
                    ) : (
                      <ButtonLink
                        href={RoutePath.Login}
                        className='h-full max-h-[52px] bg-white rounded-xl flex justify-center items-center py-5 text-base font-bold leading-[22.4px] text-grey-600'
                      >
                        Connect
                      </ButtonLink>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </>
  )
}
