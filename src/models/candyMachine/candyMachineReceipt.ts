import { Asset } from '@/models/asset'
import { WalletIdentity } from '@/models/wallet/walletIdentity'

export interface CandyMachineReceipt {
  asset: Pick<Asset, 'address' | 'name'>
  buyer: WalletIdentity
  candyMachineAddress: string
  price: number
  timestamp: string
  splTokenAddress: string
}
