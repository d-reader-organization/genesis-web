import { Nullable } from '@/models/common'
import { fetchWrapper } from '../../fetchWrapper'
import { Wallet } from '@/models/wallet'
import { WalletAsset } from '@/models/wallet/walletAsset'
import { WALLET_QUERY_KEYS } from './keys'

const { ASSETS, WALLET, GET, SYNC } = WALLET_QUERY_KEYS

export const fetchWallet = async (address: string): Promise<Nullable<Wallet>> => {
  const response = await fetchWrapper<Wallet>({ path: `${WALLET}/${GET}/${address}` })
  return response.data
}

export const fetchWallets = async (): Promise<Wallet[]> => {
  const response = await fetchWrapper<Wallet[]>({ path: `${WALLET}/${GET}` })
  return response.data ?? []
}

export const fetchWalletAssets = async (address: string): Promise<WalletAsset[]> => {
  const response = await fetchWrapper<WalletAsset[]>({ path: `${WALLET}/${GET}/${address}/${ASSETS}` })
  return response.data ?? []
}

export const syncWallet = async (address: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${WALLET}/${SYNC}/${address}`, isTextResponse: true })
}
