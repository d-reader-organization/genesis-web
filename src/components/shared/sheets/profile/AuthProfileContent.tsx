'use client'
import { User } from '@/models/user'
import React from 'react'
import { ProfileWidget } from '../../ProfileWidget'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { LogoutButton } from '../../buttons/LogoutButton'
import { ProductSocials } from '../../ProductSocials'
import { WalletSection } from './WalletSection'

type AuthProfileContentProps = { user: User }

export const AuthProfileContent: React.FC<AuthProfileContentProps> = ({ user }) => (
  <div className='flex flex-col justify-between h-full'>
    <div className='flex flex-col'>
      <ProfileWidget className='mb-[29px]' user={user} />
      <div className='flex flex-col gap-8 text-2xl font-bold leading-[28.8px] text-grey-100'>
        <Link className='hover:text-white' href={RoutePath.Library}>
          My Library
        </Link>
        <Link className='hover:text-white' href='/'>
          Help center
        </Link>
      </div>
    </div>
    <div className='flex flex-col gap-6'>
      <WalletSection />
      <LogoutButton />
      <ProductSocials />
    </div>
  </div>
)
