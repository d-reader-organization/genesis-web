'use server'

import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets'
import {
  type DeviceTokenSocialData,
  type PinData,
  type UserData,
  type WalletsData,
} from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets'

export type SignMessagePayload = {
  message: string
  userToken: string
  walletId: string
}

export type SignTransactionPayload = { transaction: string; userToken: string; walletAddress: string; walletId: string }

const circleClient = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY ?? '',
})

export const createUserForSocialLogin = async (deviceId: string): Promise<DeviceTokenSocialData | undefined> => {
  const response = await circleClient.createDeviceTokenForSocialLogin({
    deviceId,
  })
  return response.data
}

export const createUserWallet = async (userToken: string): Promise<PinData | undefined> => {
  const response = await circleClient.createWallet({
    userToken,
    accountType: 'EOA',
    blockchains: ['SOL-DEVNET'],
  })
  return response.data
}

export const getUserStatus = async (userToken: string): Promise<UserData | undefined> => {
  const response = await circleClient.getUserStatus({ userToken })
  return response.data
}

export const getUserWallets = async (userToken: string): Promise<WalletsData | undefined> => {
  const response = await circleClient.listWallets({ userToken })
  return response.data
}

export const signMessage = async ({
  message,
  userToken,
  walletId,
}: SignMessagePayload): Promise<PinData | undefined> => {
  const response = await circleClient.signMessage({ message, userToken, walletId })
  return response.data
}

export const signTransaction = async (payload: SignTransactionPayload): Promise<PinData | undefined> => {
  const response = await circleClient.signTransaction(payload)
  return response.data
}
