import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import dynamic from 'next/dynamic'
import { CommonDialogProps } from '@/models/common'

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const NoWalletConnectedDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='sm:max-w-[444px] p-4 text-lg bg-grey-600'>
        <strong>⚠️ Wallet not connected</strong>
        You need to connect your wallet first.
        <hr />
        <BaseWalletMultiButtonDynamic />
      </DialogContent>
    </Dialog>
  )
}
