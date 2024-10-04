'use client'

import React from 'react'
import { Copy, MoreHorizontal, Power, Wallet } from 'lucide-react'
import { toast } from '@/components/ui/toast/use-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import { ConnectButtonV2 } from '../../buttons/ConnectButton'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { formatWalletAddress } from '@/utils/helpers'
import PhantomIcon from 'public/assets/vector-icons/phantom.svg'
import SolflareIcon from 'public/assets/vector-icons/solflare.svg'
import UltimateIcon from 'public/assets/vector-icons/ultimate.svg'
import EspressoIcon from 'public/assets/vector-icons/espresso.svg'

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
              navigator.clipboard.writeText('0x1a3312321fd71')
              toast({ description: 'Copied to clipboard' })
            }}
          >
            <Copy className='size-5' />
          </ButtonIconWrapper>
          <ButtonIconWrapper onClick={() => {}}>
            <Power className='size-5' />
          </ButtonIconWrapper>
        </div>
      </div>
    </div>
  ) : (
    <div className='rounded-xl bg-grey-500 flex flex-col items-center gap-6 p-4'>
      <div className='text-2xl font-normal leading-[28.8px]'>
        <span className='font-bold'>Quick connect&nbsp;</span>
        <span>your wallet without Signing in.</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <WalletBox>
          <PhantomIcon />
        </WalletBox>
        <WalletBox>
          <SolflareIcon />
        </WalletBox>
        <WalletBox>
          <UltimateIcon />
        </WalletBox>
        <WalletBox>
          <EspressoIcon />
        </WalletBox>
        <WalletBox>
          <MoreHorizontal className='size-6' />
        </WalletBox>
      </div>
      <ConnectButtonV2 onClick={async () => {}} />
    </div>
  )
}

const WalletBox: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='rounded-lg bg-grey-400 flex flex-col justify-center items-center size-14 p-1'>{children}</div>
)

type ButtonIconWrapperProps = {
  onClick: () => void
} & React.PropsWithChildren

const ButtonIconWrapper: React.FC<ButtonIconWrapperProps> = ({ onClick, children }) => (
  <button className='rounded-xl bg-grey-300 p-4 flex items-center' onClick={onClick}>
    {children}
  </button>
)
