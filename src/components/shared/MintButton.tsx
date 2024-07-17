'use client'

import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineGroupWithSource } from '@/models/candyMachine/candyMachineGroup'
import { validateMintEligibilty } from '@/utils/mint'
import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'
import { Button } from '../ui/Button'
import dynamic from 'next/dynamic'
import { Loader } from './Loader'
import { WALLET_LABELS } from '@/constants/wallets'
import { AssetMintedDialog } from './dialogs/AssetMintedDialog'
import { ComicIssue } from '@/models/comicIssue'
import { EmailVerificationDialog } from './dialogs/EmailVerificationDialog'
import { NoWalletConnectedDialog } from './dialogs/NoWalletConnectedDialog'

type Props = {
  candyMachine: CandyMachine
  comicIssue: ComicIssue
  //   handleMint: () => Promise<void> TODO
  isMintTransactionLoading: boolean
  isAuthenticated: boolean
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).BaseWalletMultiButton,
  { ssr: false }
)

export const MintButton: React.FC<Props> = ({
  candyMachine,
  comicIssue,
  isAuthenticated,
  isMintTransactionLoading,
}) => {
  const { isEligible, error } = validateMintEligibilty(candyMachine.groups.at(0))
  const { publicKey } = useWallet()

  const walletAddress = publicKey?.toBase58()
  const hasWalletConnected = !!walletAddress
  const { startDate, endDate } = candyMachine.groups.at(0) as CandyMachineGroupWithSource
  const isLive = new Date(startDate) <= new Date() && new Date(endDate) > new Date()

  return isLive ? (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button className='bg-important-color min-h-[53px]' onClick={() => console.log(`missing`)}>
            {!isMintTransactionLoading ? 'Mint' : <Loader />}
          </Button>
        ) : (
          <>
            <Button disabled>{error}</Button>
          </>
        )
      ) : (
        <BaseWalletMultiButtonDynamic labels={WALLET_LABELS} style={{ width: '100%' }} />
      )}
      <AssetMintedDialog
        comicIssue={comicIssue}
        isAuthenticated={isAuthenticated}
        open={false}
        onClose={function (): void {
          // update state to false
        }}
      />
      <EmailVerificationDialog
        onClose={() => {
          // TODO
        }}
      />
      <NoWalletConnectedDialog onClose={() => {}} />
    </>
  ) : null
}
