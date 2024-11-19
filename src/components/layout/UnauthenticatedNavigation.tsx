import React from 'react'
import LogoIcon from 'public/assets/vector-icons/logo-with-text.svg'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

const UnauthenticatedNavigation: React.FC = () => (
  <Link href={RoutePath.Home} className='flex justify-between w-full border-b border-grey-300 p-6' prefetch={false}>
    <LogoIcon className='h-8 w-auto' />
  </Link>
)

export { UnauthenticatedNavigation }
