import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { EmailLoginResult, Error, SocialLoginResult } from '@circle-fin/w3s-pw-web-sdk/dist/src/types'

let webSdk: W3SSdk

const Sdk = createContext<{ sdk: W3SSdk | undefined }>({
  sdk: undefined,
})

const getConfig = () => ({
  appSettings: { appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '' },
  loginConfigs: {
    deviceToken: localStorage.getItem('deviceToken') || '',
    deviceEncryptionKey: localStorage.getItem('deviceEncryptionKey') || '',
    otpToken: localStorage.getItem('otpToken') || '',
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_CLIENT_ID || '',
      redirectUri: `${window.location.origin}/circle`,
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || '',
      redirectUri: `${window.location.origin}/circle`,
    },
  },
})

const initializeSdk = (
  onLoginComplete: (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => void
) => {
  return new W3SSdk(getConfig(), onLoginComplete)
}

export const useSdk = () => useContext(Sdk)

interface SdkProviderProps {
  children: ReactNode
}

export const SdkProvider = ({ children }: SdkProviderProps): JSX.Element => {
  const [sdk, setSdk] = useState<W3SSdk | undefined>(webSdk)

  const onLoginComplete = useCallback(
    (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => {
      // MEMO: I believe you'll receive the response here. I'll leave the rest to you.
      // Since you are using the app router of next.js, remember to check if the sdk instance exists once redirected back.
      // The timing of `useEffect` of next.js isn't be expected as you imagine.
      // So, making sure the sdk instance is initialized in the root component is a good idea.
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    },
    []
  )

  useEffect(() => {
    const sdk = initializeSdk(onLoginComplete)

    if (sdk) {
      webSdk = sdk
      setSdk(webSdk)
    }
  }, [onLoginComplete])

  const contextValues = useMemo(() => ({ sdk }), [sdk])

  return <Sdk.Provider value={contextValues}>{children}</Sdk.Provider>
}
