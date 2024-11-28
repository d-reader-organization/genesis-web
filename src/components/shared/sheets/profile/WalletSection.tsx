'use client'

import React from 'react'
import { Copy, Power, Wallet } from 'lucide-react'
import { toast } from '@/components/ui/toast/use-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import { ConnectButton } from '../../buttons/ConnectButton'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { shortenSolanaAddress } from '@/utils/helpers'
import ConnectWalletIcons from 'public/assets/vector-icons/connect-wallet-sidebar.svg'
import { ButtonIconWrapper } from '../../buttons/IconWrapper'

export const WalletSection: React.FC = () => {
  const { publicKey } = useWallet()

  useAuthorizeWallet()

  return publicKey ? (
    <ConnectedWalletBox address={publicKey.toBase58()} />
  ) : (
    <div className='rounded-xl bg-grey-500 flex flex-col items-center gap-6 p-4'>
      <div className='text-2xl font-normal leading-[28.8px]'>
        <span className='font-bold'>Quick connect&nbsp;</span>
        <span>your wallet.</span>
      </div>
      <ConnectWalletIcons />
      <ConnectButton />
    </div>
  )
}

type ConnectedWalletBoxProps = { address: string }

export const ConnectedWalletBox: React.FC<ConnectedWalletBoxProps> = ({ address }) => (
  <div className='bg-grey-500 rounded-xl p-4 flex flex-col gap-2'>
    <span className='text-grey-200 text-base font-medium leading-[22.4px]'>Connected wallet</span>
    <div className='h-10 sm:h-[52px] flex items-center justify-between'>
      <div className='flex gap-2'>
        <Wallet size={24} />
        <span className='text-base font-medium leading-[22.4px] text-white'>{shortenSolanaAddress({ address })}</span>
      </div>
      <div className='flex gap-1.5'>
        <ButtonIconWrapper
          className='p-2 sm:p-4'
          onClick={() => {
            navigator.clipboard.writeText(address)
            toast({ description: 'Copied to clipboard' })
          }}
        >
          <Copy className='sm:size-5' />
        </ButtonIconWrapper>
        <ConnectButton className='py-0 max-sm:size-10'>
          <Power className='size-5' />
        </ConnectButton>
      </div>
    </div>
  </div>
)
