'use client'

import { CandyMachine } from '@/models/candyMachine'
import { validateMintEligibilty } from '@/utils/mint'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import dynamic from 'next/dynamic'
import { Loader } from '../Loader'
import { AssetMintedDialog } from '../dialogs/AssetMintedDialog'
import { ComicIssue } from '@/models/comicIssue'
// import { EmailVerificationDialog } from './dialogs/EmailVerificationDialog'
// import { NoWalletConnectedDialog } from './dialogs/NoWalletConnectedDialog'
import { ConfirmingTransactionDialog } from '../dialogs/ConfirmingTransactionDialog'
import { useToggle } from '@/hooks'
import { Skeleton, toast } from '../../ui'
import { fetchMintOneTransaction } from '@/app/lib/api/transaction/queries'
import { useFetchCandyMachine } from '@/api/candyMachine'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { io } from 'socket.io-client'
import { CandyMachineReceipt } from '@/models/candyMachine/candyMachineReceipt'
import { useRouter } from 'next/navigation'
import { CandyMachineCoupon } from '@/models/candyMachine/candyMachineCoupon'

type Props = {
  candyMachine: CandyMachine
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const MintButton: React.FC<Props> = ({ candyMachine, comicIssue, isAuthenticated }) => {
  const [showAssetMinted, toggleAssetMinted] = useToggle()
  // const [showEmailVerification, toggleEmailVerification] = useToggle()
  // const [showWalletNotConnected, toggleWalletNotConnected] = useToggle()
  const [showConfirmingTransaction, toggleConfirmingTransaction] = useToggle()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState(false)
  const [assetAddress, setAssetAddress] = useState<string>()

  const { publicKey, signAllTransactions } = useWallet()
  const { connection } = useConnection()
  const { refresh } = useRouter()

  const walletAddress = publicKey?.toBase58()
  const hasWalletConnected = !!walletAddress

  const { isEligible } = validateMintEligibilty(candyMachine?.coupons, 5)
  const { startsAt, expiresAt } = candyMachine?.coupons.at(0) as CandyMachineCoupon
  const isLive = new Date(startsAt) <= new Date() && new Date(expiresAt) > new Date()

  const { refetch } = useFetchCandyMachine({
    candyMachineAddress: candyMachine.address,
    walletAddress,
  })

  useEffect(() => {
    if (!walletAddress) {
      return
    }
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
    socket.on(`wallet/${walletAddress}/item-minted`, async (data: CandyMachineReceipt): Promise<void> => {
      setAssetAddress(data.asset.address)
      refresh
    })
    return () => {
      socket.disconnect()
    }
  }, [walletAddress])

  const handleMint = async () => {
    setIsMintTransactionLoading(true)
    // figure out what about this
    const { data: updatedCandyMachine } = await refetch()
    if (!updatedCandyMachine) {
      return
    }

    if (!updatedCandyMachine) {
      return
    }
    const selectedCouponId = updatedCandyMachine?.coupons.at(0)?.id // TODO
    const isMintValid = validateMintEligibilty(updatedCandyMachine?.coupons, selectedCouponId)
    const mintTransactions = await fetchMintOneTransaction({
      candyMachineAddress: candyMachine.address,
      minterAddress: walletAddress ?? '',
      label: updatedCandyMachine?.coupons.find((coupon) => coupon.id === selectedCouponId)?.name ?? '', // TODO
    }).then((value) => value.map(versionedTransactionFromBs64))
    if (!signAllTransactions) {
      return toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
    }
    const signedTransactions = await signAllTransactions(mintTransactions)
    setIsMintTransactionLoading(false)
    toggleConfirmingTransaction()

    let i = 0
    for (const transaction of signedTransactions) {
      try {
        const signature = await connection.sendTransaction(transaction, { skipPreflight: true })

        const latestBlockhash = await connection.getLatestBlockhash()
        const response = await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
        toggleConfirmingTransaction()
        if (!!response.value.err) {
          console.log('Response error log: ', response.value.err)
          throw new Error()
        }
        toggleAssetMinted()
        toast({ description: 'Successfully minted the comic! Find the asset in your wallet', variant: 'success' })
      } catch (e) {
        toggleConfirmingTransaction()
        console.log('error: ', e)
        if (signedTransactions.length === 2 && i === 0) {
          toast({
            description: 'Wallet is not allowlisted to mint this comic',
            variant: 'error',
          })
        } else {
          toast({
            description: 'Something went wrong',
            variant: 'error',
          })
        }
      }
      i += 1
    }
  }

  return isLive ? (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button className='bg-important-color min-h-[52px]' onClick={handleMint}>
            {!isMintTransactionLoading ? 'Purchase' : <Loader />}
          </Button>
        ) : (
          <>
            <Button disabled>Not eligible</Button>
          </>
        )
      ) : (
        <BaseWalletMultiButtonDynamic style={{ width: '100%' }} />
      )}
      <AssetMintedDialog
        assetAddress={assetAddress}
        comicIssue={comicIssue}
        isAuthenticated={isAuthenticated}
        open={showAssetMinted}
        toggleDialog={toggleAssetMinted}
      />
      {/* <EmailVerificationDialog open={showEmailVerification} toggleDialog={toggleEmailVerification} /> */}
      {/* <NoWalletConnectedDialog open={showWalletNotConnected} toggleDialog={toggleWalletNotConnected} /> */}
      <ConfirmingTransactionDialog open={showConfirmingTransaction} toggleDialog={toggleConfirmingTransaction} />
    </>
  ) : (
    <Skeleton className='h-[52px] w-40' />
  )
}
