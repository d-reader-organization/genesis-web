'use client'

import React from 'react'
import { Button } from '../ui/Button'
import GoogleLogoIcon from 'public/assets/vector-icons/google-logo.svg'
import { signIn } from 'next-auth/react'

export const GoogleSignInButton: React.FC = () => (
  <Button onClick={() => signIn('google')} type='button' className='text-grey-100' variant='outline'>
    <GoogleLogoIcon className='mr-1 h-[19px]' />
    Sign in with google
  </Button>
)
