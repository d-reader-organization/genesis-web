import React from 'react'
import dynamic from 'next/dynamic'
import { WALLET_LABELS } from '@/constants/wallets'
require('@solana/wallet-adapter-react-ui/styles.css')

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).BaseWalletMultiButton
)

export const SolanaBaseWalletButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = () => (
  <BaseWalletMultiButtonDynamic labels={WALLET_LABELS} />
)
