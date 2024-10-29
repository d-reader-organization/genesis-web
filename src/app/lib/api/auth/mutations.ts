'use server'

import { ConnectWalletData } from '@/models/wallet/connectWallet'
import { fetchWrapper } from '../../fetchWrapper'
import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'

const { AUTH, WALLET, CONNECT, DISCONNECT, REQUEST_PASSWORD } = AUTH_QUERY_KEYS

export const connectUserWallet = async (data: ConnectWalletData): Promise<{ errorMessage?: string }> => {
  return await fetchWrapper<void>({
    path: `${AUTH}/${WALLET}/${CONNECT}`,
    method: 'PATCH',
    body: data,
  })
}

export const disconnectUserWallet = async (address: string): Promise<{ errorMessage?: string }> => {
  return await fetchWrapper<void>({
    path: `${AUTH}/${WALLET}/${DISCONNECT}/${address}`,
    method: 'PATCH',
  })
}

export const requestWalletPassword = async (address: string): Promise<string> => {
  const response = await fetchWrapper<string>({
    path: `${AUTH}/${WALLET}/${REQUEST_PASSWORD}/${address}`,
    method: 'PATCH',
    revalidateCacheInSeconds: 60 * 60 * 24,
    isTextResponse: true,
  })
  return response.data ?? ''
}
