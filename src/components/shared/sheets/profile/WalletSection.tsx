'use client'

import React from 'react'
import { Copy, Power, Wallet } from 'lucide-react'
import { toast } from '@/components/ui/toast/use-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import { ConnectButton } from '../../buttons/ConnectButton'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { formatWalletAddress } from '@/utils/helpers'
import ConnectWalletIcons from 'public/assets/vector-icons/connect-wallet-sidebar.svg'

export const WalletSection: React.FC = () => {
  const { publicKey } = useWallet()

  useAuthorizeWallet()

  return publicKey ? (
    <div className='bg-grey-500 rounded-xl p-4 flex flex-col gap-2'>
      <span className='text-grey-200 text-base font-medium leading-[22.4px]'>Connected wallet</span>
      <div className='h-[52px] flex items-center justify-between'>
        <div className='flex gap-2'>
          <Wallet size={24} />
          <span className='text-base font-medium leading-[22.4px] text-white'>
            {formatWalletAddress(publicKey.toBase58())}
          </span>
        </div>
        <div className='flex gap-1.5'>
          <ButtonIconWrapper
            onClick={() => {
              navigator.clipboard.writeText(publicKey.toBase58())
              toast({ description: 'Copied to clipboard' })
            }}
          >
            <Copy className='size-5' />
          </ButtonIconWrapper>
          <ConnectButton>
            <Power className='size-5' />
          </ConnectButton>
        </div>
      </div>
    </div>
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

type ButtonIconWrapperProps = {
  onClick: () => void
} & React.PropsWithChildren

const ButtonIconWrapper: React.FC<ButtonIconWrapperProps> = ({ onClick, children }) => (
  <button className='rounded-xl bg-grey-300 p-4 flex items-center' onClick={onClick}>
    {children}
  </button>
)
