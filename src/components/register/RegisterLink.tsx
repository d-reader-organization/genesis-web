'use client'

import Link from 'next/link'
import { RoutePath } from '@/utils/enums'
import { Text } from '@/components/ui'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export const RegisterLink: React.FC = () => {
  const searchParams = useSearchParams()
  return (
    <Link className='flex hover:brightness-150' href={`${RoutePath.Register}?${searchParams}`}>
      <Text as='p' styleVariant='body-normal' className='text-grey-100'>
        Don&apos;t have an account?&nbsp;
      </Text>
      <Text as='p' styleVariant='body-normal' className='text-important-color'>
        Register here
      </Text>
    </Link>
  )
}

export const RegisterLinkWrapper: React.FC = () => (
  <Suspense>
    <RegisterLink />
  </Suspense>
)
