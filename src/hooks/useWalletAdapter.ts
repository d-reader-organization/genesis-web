import { ledger } from '@/constants/ledgerAdapter'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import { network } from '@/constants/solanaEnv'
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter'

type WalletAdapterHook = () => (PhantomWalletAdapter | SolflareWalletAdapter | TipLinkWalletAdapter)[]

export const useWalletAdapter: WalletAdapterHook = () => {
  return useMemo(() => {
    if (typeof window === 'undefined') return []
    else
      return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TipLinkWalletAdapter({
          title: 'dReader',
          clientId: process.env.TIPLINK_CLIENT_ID ?? '',
          theme: 'dark',
        }),
        ledger,
      ]
  }, [])
}
