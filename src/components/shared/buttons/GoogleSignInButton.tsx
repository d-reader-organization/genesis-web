'use client'

import { Button } from '../../ui/Button'
import GoogleLogoIcon from 'public/assets/vector-icons/google-logo.svg'
import { signIn } from 'next-auth/react'
import { Text } from '@/components/ui/Text'

type Props = {
  buttonText?: string
}

export const GoogleSignInButton: React.FC<Props> = ({ buttonText = 'Sign in with google' }) => {
  const handleSignIn = (providerId: string) => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isWebView = userAgent.includes('wv') || userAgent.includes('webview')
    if (isWebView) {
      const authUrl = `/api/auth/signin/${providerId}?callbackUrl=${encodeURIComponent(window.location.origin)}`
      window.open(authUrl, '_blank')
    } else {
      signIn(providerId)
    }
  }

  return (
    <Button onClick={() => handleSignIn('google')} type='button' className='text-grey-100' variant='outline'>
      <GoogleLogoIcon className='mr-1 h-[19px]' />
      <Text as='p' fontWeight='medium' styleVariant='body-normal'>
        {buttonText}
      </Text>
    </Button>
  )
}
