'use client'

import { createUserForSocialLogin } from '@/app/lib/actions/circle'
import { Button } from '@/components/ui'
import { useSdk } from '@/contexts/Sdk'
import { SocialLoginProvider } from '@circle-fin/w3s-pw-web-sdk/dist/src/types'
import { useCallback } from 'react'

export default function CirclePage() {
  const { sdk } = useSdk()

  const onLogin = useCallback(async () => {
    if (!sdk) {
      return
    }

    const deviceId = await sdk.getDeviceId()
    const response = await createUserForSocialLogin(deviceId)

    if (!response) {
      return
    }

    localStorage.setItem('deviceToken', response.deviceToken)
    localStorage.setItem('deviceEncryptionKey', response.deviceEncryptionKey ?? '')

    sdk.performLogin(SocialLoginProvider.FACEBOOK)
  }, [sdk])

  return (
    <div className='flex flex-col gap-6'>
      <h1> Circle integration testing</h1>
      <Button onClick={onLogin}>Login with google</Button>
    </div>
  )
}
