'use client'

import React from 'react'
import {
  createUserForSocialLogin,
  createUserWallet,
  type SignTransactionPayload,
  type SignMessagePayload,
  signMessage,
  signTransaction,
} from '@/app/lib/actions/circle'
import { Button } from '@/components/ui'
import { useCircleSdk } from '@/providers/CircleSdkProvider'
import { SocialLoginProvider } from '@circle-fin/w3s-pw-web-sdk/dist/src/types'
import { useCallback } from 'react'

export default function CirclePage() {
  const { deviceId, executeChallenge, circleSdk, setUserDeviceId, setUserDeviceTokens, userToken, wallets } =
    useCircleSdk()
  const onLogin = useCallback(async () => {
    if (!circleSdk) {
      return
    }
    const deviceId = await circleSdk.getDeviceId()
    setUserDeviceId?.(deviceId)
    const response = await createUserForSocialLogin(deviceId)
    if (!response) {
      return
    }
    setUserDeviceTokens?.(response)
    circleSdk.performLogin(SocialLoginProvider.GOOGLE)
  }, [circleSdk])
  const createWalletAction = async (userToken: string) => {
    const response = await createUserWallet(userToken)
    executeChallenge?.(response?.challengeId ?? '')
  }
  const signAndSendMessage = async (payload: SignMessagePayload) => {
    const response = await signMessage(payload)
    executeChallenge?.(response?.challengeId ?? '')
  }
  const signAndSendTransaction = async (payload: SignTransactionPayload) => {
    const response = await signTransaction(payload)
    executeChallenge?.(response?.challengeId ?? '')
  }
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h1> Circle integration testing</h1>
      {deviceId ? null : <Button onClick={onLogin}>Login with google</Button>}
      {userToken ? (
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => {
              createWalletAction(userToken)
            }}
          >
            Create wallet
          </Button>
          {wallets?.length ? (
            <div className='flex flex-col gap-4'>
              <Button
                onClick={() =>
                  signAndSendMessage({
                    message: 'Test message', // will get message from our API
                    userToken,
                    walletId: wallets.at(0)!.id,
                  })
                }
              >
                Sign message
              </Button>
              <Button
                onClick={() =>
                  signAndSendTransaction({
                    transaction: 'mi transaction', // will get transaction from our API
                    userToken,
                    walletAddress: wallets.at(0)!.address,
                    walletId: wallets.at(0)!.id,
                  })
                }
              >
                Sign transaction
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
