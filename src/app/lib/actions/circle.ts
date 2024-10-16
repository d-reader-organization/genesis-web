'use server'

import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets'
import {
  CreateEndUserWalletData,
  DeviceTokenSocialData,
  PinData,
  SignTransactionResponseData,
  UserData,
  WalletsData,
} from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets'

const circleClient = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY ?? '',
})

export const createUserForSocialLogin = async (deviceId: string): Promise<DeviceTokenSocialData | undefined> => {
  const response = await circleClient.createDeviceTokenForSocialLogin({
    deviceId,
  })
  return response.data
}

export const createUserWallet = async (userToken: string): Promise<CreateEndUserWalletData | undefined> => {
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
}: {
  message: string
  userToken: string
  walletId: string
}): Promise<PinData | undefined> => {
  const response = await circleClient.signMessage({ message, userToken, walletId })
  return response.data
}

export const signTransaction = async ({
  transaction,
  userToken,
  walletId,
}: {
  transaction: string
  userToken: string
  walletId: string
}): Promise<SignTransactionResponseData | undefined> => {
  const response = await circleClient.signTransaction({ transaction, userToken, walletId })
  return response.data
}
