'use client'

import React from 'react'
import { useFetchUserWallets } from '@/api/user'
import { shortenString } from '@/utils/helpers'
import { Button, Text } from '../ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDisconnectUserWallet } from '@/api/auth'
import CloseIcon from 'public/assets/vector-icons/close.svg'
import { ConnectButton } from '../shared/buttons/ConnectButton'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'

type Props = {
  id: number | string
}

export const UserWalletSection: React.FC<Props> = ({ id }) => {
  const { publicKey } = useWallet()
  const { mutateAsync: disconnectWallet } = useDisconnectUserWallet()
  const { data: connectedWallets = [] } = useFetchUserWallets(id)
  useAuthorizeWallet()

  return (
    <div className='max-w-[580px] px-2'>
      <div className='py-8'>
        <h2 className='text-2xl font-bold'>Manage wallets</h2>
        <Text as='p' styleVariant='body-small' className='text-grey-200'>
          Link any wallet you wish to have connected with your account. This will allow you to see all your comics &
          collectibles in one place.
        </Text>
      </div>

      <ul className='border border-gray-300 rounded-lg'>
        {connectedWallets.map((wallet) => (
          <li
            key={wallet.address}
            className={`wallet-item flex justify-between p-4 rounded-md ${wallet.address === publicKey?.toBase58() ? 'bg-gray-500' : ''}`}
          >
            <Text as='p' styleVariant='body-normal'>
              {shortenString(wallet.address)}
            </Text>
            <Button
              onClick={async () => {
                await disconnectWallet(wallet.address)
              }}
              variant='ghost'
              className='bg-transparent p-0 w-4 h-fit self-center'
            >
              <CloseIcon className='close-icon w-4 h-4' />
            </Button>
          </li>
        ))}
        <li className='p-2'>
          <ConnectButton className='bg-grey-200 text-black font-bold' />
        </li>
      </ul>
    </div>
  )
}
