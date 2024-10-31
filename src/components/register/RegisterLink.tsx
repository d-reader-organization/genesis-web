'use client'

import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { Text } from '@/components/ui'
import { useSearchParams } from 'next/navigation'


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
