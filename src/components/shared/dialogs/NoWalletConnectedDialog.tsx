import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import dynamic from 'next/dynamic'
import { WALLET_LABELS } from '@/constants/wallets'

type Props = {
  onClose: () => void
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).BaseWalletMultiButton,
  { ssr: false }
)

export const NoWalletConnectedDialog: React.FC<Props> = ({ onClose }) => {
  return (
    <Dialog open>
      <DialogContent className='sm:max-w-[444px] p-4 text-lg bg-grey-600'>
        <strong>⚠️ Wallet not connected</strong>
        You need to connect your wallet first.
        <hr />
        <BaseWalletMultiButtonDynamic labels={WALLET_LABELS} />
      </DialogContent>
    </Dialog>
  )
}
