import { User } from '@/models/user'
import React from 'react'
import { ProfileWidget } from '../../ProfileWidget'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { LogoutButton } from '../../buttons/LogoutButton'
import { ProductSocials } from '../../ProductSocials'
import { Copy, Power, Wallet } from 'lucide-react'
import { toast } from '@/components/ui/toast/use-toast'

type AuthProfileContentProps = { user: User }

export const AuthProfileContent: React.FC<AuthProfileContentProps> = ({ user }) => (
  <div className='flex flex-col justify-between h-full'>
    <div className='flex flex-col'>
      <ProfileWidget className='mb-[29px]' user={user} />
      <div className='flex flex-col gap-8 text-2xl font-bold leading-[28.8px] text-grey-100'>
        <Link href={RoutePath.Library}>My Library</Link>
        <Link href='/'>Help center</Link>
      </div>
    </div>
    <div className='flex flex-col gap-6'>
      <WalletSection />
      <LogoutButton />
      <ProductSocials />
    </div>
  </div>
)

const WalletSection: React.FC = () => (
  <div className='bg-grey-500 rounded-xl p-4 flex flex-col gap-2'>
    <span className='text-grey-200 text-base font-medium leading-[22.4px]'>Connected wallet</span>
    <div className='h-[52px] flex items-center justify-between'>
      <div className='flex gap-2'>
        <Wallet size={24} />
        <span className='text-base font-medium leading-[22.4px] text-white'>0x1a3...fd71</span>
      </div>
      <div className='flex gap-1.5'>
        <ButtonIconWrapper
          onClick={() => {
            navigator.clipboard.writeText('0x1a3312321fd71')
            toast({ description: 'Copied to clipboard' })
          }}
        >
          <Copy className='size-5' />
        </ButtonIconWrapper>
        <ButtonIconWrapper onClick={() => {}}>
          <Power className='size-5' />
        </ButtonIconWrapper>
      </div>
    </div>
  </div>
)
type ButtonIconWrapperProps = {
  onClick: () => void
} & React.PropsWithChildren

const ButtonIconWrapper: React.FC<ButtonIconWrapperProps> = ({ onClick, children }) => (
  <button className='rounded-xl bg-grey-300 p-4 flex items-center' onClick={onClick}>
    {children}
  </button>
)
