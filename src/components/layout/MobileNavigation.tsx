import { RoutePath } from '@/enums/routePath'
import DReaderSymbol from 'public/assets/vector-icons/logo.svg'
import { Button, ButtonLink } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, Search, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { logoutAction } from '@/app/lib/actions/logout'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import Image from 'next/image'
import { User } from '@/models/user'
import React from 'react'

type Props = {
  user?: User | null
}

export const MobileNav: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <div
      className={cn(
        'fixed top-0 z-10 w-full md:hidden h-full bg-grey-600 bg-opacity-85 backdrop-blur-[25px]',
        isOpen ? 'max-h-full' : 'max-h-20'
      )}
    >
      <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
        <Search size={24} />
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
                  <Link href={RoutePath.Discover}>Discover</Link>
                  <button onClick={() => setIsOpen(false)}>
                    <X className='size-6 text-grey-100' />
                  </button>
                </div>
                <Link href={RoutePath.Invest}>Invest</Link>
              </div>
              {user ? (
                <div className='flex flex-col gap-10 border-t border-t-grey-400'>
                  <div className='flex gap-3 items-center mt-10'>
                    <Image
                      alt='avatar'
                      width={48}
                      height={48}
                      src={user.avatar}
                      className='size-12 object-cover rounded-full border border-black'
                    />
                    <Link href={RoutePath.Profile} className='flex flex-col justify-center gap-1 max-h-12'>
                      <span className='text-lg font-bold leading-[25.2px] text-grey-100'>{user.name}</span>
                      <span className='text-grey-200 text-sm font-medium leading-[19.6px]'>view profile</span>
                    </Link>
                  </div>
                  <div className='flex flex-col gap-8'>
                    <Link href={RoutePath.Library}>My Library</Link>
                    <Link href={RoutePath.Profile}>Settings</Link>
                  </div>
                  <Button
                    className='rounded-xl border border-grey-200 bg-grey-600'
                    onClick={() => logoutAction()}
                    variant='outline'
                  >
                    Log out
                  </Button>
                  <div className='flex justify-between items-center'>
                    <TwitterIcon className='size-4' />
                    <InstagramIcon className='size-4' />
                    <DiscordIcon className='size-4' />
                  </div>
                </div>
              ) : (
                <ButtonLink
                  href={RoutePath.Login}
                  className='h-full max-h-[52px] bg-white rounded-xl flex justify-center items-center py-5 text-base font-bold laeding-[22.4px] text-grey-600'
                >
                  Connect
                </ButtonLink>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
