'use client'

import { createUserForSocialLogin } from '@/app/lib/actions/circle'
import { Button } from '@/components/ui'
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import {
  SocialLoginProvider,
  SocialLoginResult,
  Error as CircleError,
  EmailLoginResult,
} from '@circle-fin/w3s-pw-web-sdk/dist/src/types'
import { useEffect } from 'react'

const appId = process.env.NEXT_PUBLIC_CIRCLE_APP_ID ?? ''

let sdk: W3SSdk

export default function CirclePage() {
  const onSuccessLogin = (error: CircleError | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => {
    console.log(`inside on success login`)
    if (error) {
      console.error(error)
      return
    }
    console.log(result)
    localStorage.setItem('userToken', result?.userToken ?? '')
    localStorage.setItem('encryptionKey', result?.encryptionKey ?? '')
  }

  useEffect(() => {
    sdk = new W3SSdk(
      {
        appSettings: {
          appId,
        },
      },
      onSuccessLogin
    )
  }, [])

  const onLogin = async () => {
    const deviceId = await sdk.getDeviceId()
    localStorage.setItem('deviceId', deviceId)
    const response = await createUserForSocialLogin(deviceId)

    if (!response) {
      return
    }

    sdk.updateConfigs(
      {
        appSettings: { appId },
        loginConfigs: {
          deviceToken: response.deviceToken,
          deviceEncryptionKey: response.deviceEncryptionKey ?? '',
          google: {
            clientId: `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}`,
            redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/circle`,
          },
        },
      },
      onSuccessLogin
    )
    sdk.performLogin(SocialLoginProvider.GOOGLE)
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1> Circle integration testing</h1>
      <Button onClick={onLogin}>Login with google</Button>
    </div>
  )
}
