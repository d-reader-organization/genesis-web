import React from 'react'
import { Text } from '../ui/Text'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

export const TermsOfServiceAndPrivacyPolicy: React.FC = () => (
  <Text as='p' styleVariant='body-small' className='text-grey-100'>
    By creating an account I confirm I read and agree to the
    <Link className='text-important-color hover:brightness-150' href={RoutePath.TermsOfService} target='_blank'>
      &nbsp;Terms of Service&nbsp;
    </Link>
    &
    <Link className='text-important-color hover:brightness-150' href={RoutePath.PrivacyPolicy} target='_blank'>
      &nbsp;Privacy Policy
    </Link>
  </Text>
)
