'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'

const { AUTH, WALLET, CONNECT, DISCONNECT, REQUEST_PASSWORD } = AUTH_QUERY_KEYS

export const connectUserWallet = async ({
  address,
  encoding,
}: {
  address: string
  encoding: string
}): Promise<void> => {
  await fetchWrapper<void>({
    path: `${AUTH}/${WALLET}/${CONNECT}/${address}/${encoding}`,
    method: 'PATCH',
  })
}

export const disconnectUserWallet = async (address: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${AUTH}/${WALLET}/${DISCONNECT}/${address}`, method: 'PATCH' })
}

export const requestWalletPassword = async (address: string): Promise<string> => {
  const response = await fetchWrapper<string>({
    path: `${AUTH}/${WALLET}/${REQUEST_PASSWORD}/${address}`,
    method: 'PATCH',
    isTextResponse: true,
  })
  return response.data ?? ''
}
