import React from 'react'
import { Text } from '../ui/Text'
import Link from 'next/link'

export const TermsOfServiceAndPrivacyPolicy: React.FC = () => (
  <Text as='p' className='text-sm text-grey-100 leading-4'>
    By creating an account I confirm I read and agree to the
    <Link className='text-important-color hover:brightness-150' href='/privacy-policy' target='_blank'>
      &nbsp;Terms of Service&nbsp;
    </Link>
    &
    <Link className='text-important-color hover:brightness-150' href='/privacy-policy' target='_blank'>
      &nbsp;Privacy Policy
    </Link>
  </Text>
)
