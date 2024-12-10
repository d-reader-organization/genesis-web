'use client'

import { Button } from '../../ui/Button'
import GoogleLogoIcon from 'public/assets/vector-icons/google-logo.svg'
import { signIn } from 'next-auth/react'
import { Text } from '@/components/ui/Text'
import { cn } from '@/lib/utils'

type Props = {
  buttonText?: string
} & Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'>

export const GoogleSignInButton: React.FC<Props> = ({ buttonText = 'Sign in with google', className }) => {
  const handleSignIn = (providerId: string) => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isWebView =
      userAgent.includes('wv') ||
      userAgent.includes('webview') ||
      typeof window.phantom !== undefined ||
      userAgent.includes('snap') ||
      userAgent.includes('snapchat')

    if (isWebView) {
      const authUrl = `/api/auth/signin/${providerId}?callbackUrl=${encodeURIComponent(window.location.origin)}`
      window.open(authUrl, '_blank')
    } else {
      signIn(providerId)
    }
  }

  return (
    <Button
      onClick={() => handleSignIn('google')}
      type='button'
      size='lg'
      className={cn('text-grey-100', className)}
      variant='outline'
    >
      <GoogleLogoIcon className='mr-1 h-[18px]' />
      <Text as='p' fontWeight='bold' styleVariant='body-normal'>
        {buttonText}
      </Text>
    </Button>
  )
}
