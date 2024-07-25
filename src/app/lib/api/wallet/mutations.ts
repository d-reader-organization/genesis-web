import { WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { Wallet, UpdateWalletData } from '@/models/wallet'
import { fetchWrapper } from '@/app/lib/fetchWrapper'
import { Nullable } from '@/models/common'

const { WALLET, UPDATE } = WALLET_QUERY_KEYS

export const updateWallet = async (address: string, request: UpdateWalletData): Promise<Nullable<Wallet>> => {
  const response = await fetchWrapper<Wallet>({
    path: `${WALLET}/${UPDATE}/${address}`,
    body: request,
    method: 'PATCH',
  })
  return response.data
}
