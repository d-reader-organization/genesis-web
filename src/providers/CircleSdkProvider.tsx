// TODO use zustand store

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import {
  type SignMessageResult,
  type Configs,
  type EmailLoginResult,
  type Error,
  type SocialLoginResult,
} from '@circle-fin/w3s-pw-web-sdk/dist/src/types'
import { toast } from '@/components/ui'
import {
  deviceIdKey,
  deviceTokenEncryptionKey,
  deviceTokenKey,
  otpTokenKey,
  userEncryptionKey,
  userTokenKey,
} from '@/constants/circle'
import {
  type Wallet,
  type DeviceTokenSocialData,
} from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets'
import { getUserWallets } from '@/app/lib/actions/circle'

let webSdk: W3SSdk

type ContextReturnType = {
  deviceId?: string
  executeChallenge?: (challengeId: string) => void
  circleSdk?: W3SSdk
  userToken?: string
  setUserDeviceId?: (newDeviceId: string) => void
  setUserDeviceTokens?: (data: DeviceTokenSocialData) => void
  wallets?: Wallet[]
}

const CircleSdk = createContext<ContextReturnType>({})

const getConfig = (): Configs => ({
  appSettings: { appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '' },
  authentication: {
    encryptionKey: localStorage.getItem(userEncryptionKey) ?? '',
    userToken: localStorage.getItem(userTokenKey) ?? '',
  },
  loginConfigs: {
    deviceToken: localStorage.getItem(deviceTokenKey) ?? '',
    deviceEncryptionKey: localStorage.getItem(deviceTokenEncryptionKey) ?? '',
    otpToken: localStorage.getItem(otpTokenKey) ?? '',
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID ?? '',
      redirectUri: `${window.location.origin}/circle`,
    },
  },
})

const initializeW3Sdk = (
  onLoginComplete: (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => void
) => {
  return new W3SSdk(getConfig(), onLoginComplete)
}

export const useCircleSdk = () => useContext(CircleSdk)

interface SdkProviderProps {
  children: ReactNode
}

export const CircleSdkProvider = ({ children }: SdkProviderProps): JSX.Element => {
  const [deviceId, setDeviceId] = useState<string>()
  const [userToken, setUserToken] = useState<string>()
  const [encryptionKey, setEncryptionKey] = useState<string>()
  const [wallets, setWallets] = useState<Wallet[]>([])

  const afterLoginComplete = async (result: SocialLoginResult | EmailLoginResult | undefined) => {
    localStorage.setItem(userTokenKey, result?.userToken ?? '')
    localStorage.setItem(userEncryptionKey, result?.encryptionKey ?? '')
    setUserToken(result?.userToken)
    setEncryptionKey(result?.encryptionKey)
  }

  const onLoginComplete = useCallback(
    async (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => {
      if (error) {
        console.error(error)
        toast({ title: 'Error', description: 'Circle error', variant: 'error' })
        return
      }
      await afterLoginComplete(result)
    },
    []
  )

  const getAndStoreUserWallets = async (userToken: string) => {
    const response = await getUserWallets(userToken)
    setWallets(response?.wallets ?? [])
  }

  const executeChallenge = useCallback((challengeId: string) => {
    if (!webSdk) {
      toast({ title: 'Circle SDK is not initialized properly', description: 'Something is wrong', variant: 'error' })
      return
    }

    webSdk.execute(challengeId, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      const signMessageResult = result as SignMessageResult
      if (signMessageResult.data) {
        console.log(`signature`, signMessageResult.data.signature)
      }
      toast({ title: 'Challenge executed!', description: 'Success', variant: 'success' })
    })
  }, [])

  const setUserDeviceId = useCallback((newDeviceId: string) => {
    localStorage.setItem(deviceIdKey, newDeviceId)
    setDeviceId(newDeviceId)
  }, [])

  const setUserDeviceTokens = useCallback((data: DeviceTokenSocialData) => {
    localStorage.setItem(deviceTokenKey, data.deviceToken)
    localStorage.setItem(deviceTokenEncryptionKey, data.deviceEncryptionKey ?? '')
  }, [])

  useEffect(() => {
    if (!userToken) {
      return
    }
    getAndStoreUserWallets(userToken)
    if (encryptionKey && webSdk) {
      webSdk.setAuthentication({
        encryptionKey,
        userToken,
      })
    }
  }, [userToken, encryptionKey, webSdk])

  useEffect(() => {
    webSdk = initializeW3Sdk(onLoginComplete)

    if (webSdk) {
      setDeviceId(localStorage.getItem(deviceIdKey) ?? '')
      setUserToken(localStorage.getItem(userTokenKey) ?? '')
    }
  }, [onLoginComplete])

  const contextValues = useMemo(
    (): ContextReturnType => ({
      deviceId,
      executeChallenge,
      circleSdk: webSdk,
      setUserDeviceTokens,
      userToken,
      setUserDeviceId,
      wallets,
    }),
    [deviceId, executeChallenge, webSdk, setUserDeviceTokens, userToken, setUserDeviceId, wallets]
  )

  return <CircleSdk.Provider value={contextValues}>{children}</CircleSdk.Provider>
}
