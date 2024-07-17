'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { User } from '@/models/user'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { isAuthenticatedUser } from '../../auth'
import { Wallet } from '@/models/wallet'

const { USER, GET, ME, WALLETS } = USER_QUERY_KEYS

export const fetchMe = async (): Promise<Nullable<User>> => {
  if (!isAuthenticatedUser()) {
    return null
  }
  const response = await fetchWrapper<User>({ path: `${USER}/${GET}/${ME}` })
  return response.data
}

export const fetchUserWallets = async (id: string | number): Promise<Wallet[]> => {
  const response = await fetchWrapper<Wallet[]>({ path: `${USER}/${GET}/${id}/${WALLETS}` })
  return response.data ?? []
}
