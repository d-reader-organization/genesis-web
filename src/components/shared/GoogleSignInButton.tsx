'use client'

import React from 'react'
import { Button } from '../ui/Button'
import GoogleLogoIcon from 'public/assets/vector-icons/google-logo.svg'
import { signIn } from 'next-auth/react'

type Props = {
  buttonText?: string
}

export const GoogleSignInButton: React.FC<Props> = ({ buttonText = 'Sign in with google' }) => (
  <Button onClick={() => signIn('google')} type='button' className='text-grey-100' variant='outline'>
    <GoogleLogoIcon className='mr-1 h-[19px]' />
    {buttonText}
  </Button>
)
