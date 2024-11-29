'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { User } from '@/models/user'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { isAuthenticatedUser } from '../../utils/auth'
import { Wallet } from '@/models/wallet'
import { WalletAsset } from '@/models/wallet/walletAsset'

const { ASSETS, USER, GET, ME, WALLETS, REQUEST_EMAIL_VERIFICATION, REDEEM_REFERRAL, SYNC_WALLETS } = USER_QUERY_KEYS

export const fetchMe = async (): Promise<Nullable<User>> => {
  if (!isAuthenticatedUser()) {
    return null
  }
  const response = await fetchWrapper<User>({ path: `${USER}/${GET}/${ME}`, revalidateCacheInSeconds: 10 })
  return response.data
}

export const fetchUserWallets = async (id: string | number): Promise<Wallet[]> => {
  const response = await fetchWrapper<Wallet[]>({ path: `${USER}/${GET}/${id}/${WALLETS}` })
  return response.data ?? []
}

export const redeemUserReferral = async (referrer: string): Promise<Nullable<User>> => {
  const response = await fetchWrapper<User>({ path: `${USER}/${REDEEM_REFERRAL}/${referrer}` })
  return response.data
}

export const fetchUserAssets = async (id: string | number): Promise<WalletAsset[]> => {
  const response = await fetchWrapper<WalletAsset[]>({ path: `${USER}/${GET}/${id}/${ASSETS}` })
  return response.data ?? []
}

export const requestUserEmailVerification = async (): Promise<string> => {
  const { errorMessage } = await fetchWrapper<void>({ path: `${USER}/${REQUEST_EMAIL_VERIFICATION}`, method: 'PATCH' })
  return errorMessage ?? ' '
}

export const syncUserWallets = async (id: string | number): Promise<void> => {
  await fetchWrapper({ path: `${USER}/${SYNC_WALLETS}/${id}` })
}
