'use client'

import { checkIfCouponIsActive, validateMintEligibilty } from '@/utils/mint'
import { useWallet } from '@solana/wallet-adapter-react'
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
import { fetchMintTransaction } from '@/app/lib/api/transaction/queries'
import { useFetchCandyMachine } from '@/api/candyMachine'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { io } from 'socket.io-client'
import { CandyMachineReceipt } from '@/models/candyMachine/candyMachineReceipt'
import { useRouter } from 'next/navigation'
import { sendMintTransaction } from '@/app/lib/api/transaction/mutations'
import { useCandyMachine } from '@/providers/CandyMachineProvider'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const MintButton: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const { candyMachine, selectedCoupon, numberOfItems, selectedCurrency } = useCandyMachine()
  const [showAssetMinted, toggleAssetMinted] = useToggle()
  // const [showEmailVerification, toggleEmailVerification] = useToggle()
  // const [showWalletNotConnected, toggleWalletNotConnected] = useToggle()
  const [showConfirmingTransaction, toggleConfirmingTransaction, closeConfirmingTransaction] = useToggle()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState(false)
  const [assetAddress, setAssetAddress] = useState<string>()

  const { publicKey, signAllTransactions } = useWallet()
  const { refresh } = useRouter()

  const walletAddress = publicKey?.toBase58()
  const hasWalletConnected = !!walletAddress

  const { isEligible } = validateMintEligibilty(candyMachine?.coupons ?? [], selectedCoupon?.id)
  const isLive = selectedCoupon ? checkIfCouponIsActive(selectedCoupon) : false

  const { refetch } = useFetchCandyMachine({
    candyMachineAddress: candyMachine?.address ?? '',
    walletAddress,
  })

  useEffect(() => {
    if (!walletAddress) {
      return
    }
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
    socket.on(`wallet/${walletAddress}/item-minted`, async (data: CandyMachineReceipt): Promise<void> => {
      setAssetAddress(data.asset.address)
      toggleConfirmingTransaction()
      toggleAssetMinted()
      toast({ description: 'Successfully minted the comic! Find the asset in your wallet', variant: 'success' })
      refresh
    })
    return () => {
      socket.disconnect()
    }
  }, [walletAddress])

  const handleMint = async () => {
    if (!walletAddress || !selectedCurrency) return
    setIsMintTransactionLoading(true)
    // figure out what about this
    const { data: updatedCandyMachine } = await refetch()
    if (!updatedCandyMachine || !selectedCoupon) {
      return
    }

    const isMintValid = validateMintEligibilty(updatedCandyMachine?.coupons, selectedCoupon.id)
    if (!isMintValid) {
      toast({ description: "You're not eligible for the mint", variant: 'error' })
    }
    const mintTransactions = await fetchMintTransaction({
      candyMachineAddress: updatedCandyMachine.address,
      minterAddress: walletAddress,
      couponId: selectedCoupon.id,
      label: selectedCurrency.label,
      numberOfItems: numberOfItems ?? 1,
    }).then((value) => value.map(versionedTransactionFromBs64))

    if (!signAllTransactions) {
      return toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
    }

    try{
      const signedTransactions = await signAllTransactions(mintTransactions)
      setIsMintTransactionLoading(false)
      toggleConfirmingTransaction()
  
      const serializedTransactions: string[] = []
      for (const transaction of signedTransactions) {
        try {
          const serializedTransaction = Buffer.from(transaction.serialize()).toString('base64')
          serializedTransactions.push(serializedTransaction)
        } catch (e) {
          setIsMintTransactionLoading(false)
          closeConfirmingTransaction()
          toast({
            description: 'Something went wrong',
            variant: 'error',
          })
        }
      }
      await sendMintTransaction(walletAddress, serializedTransactions)
    }catch(e){
      setIsMintTransactionLoading(false)
      closeConfirmingTransaction();
    }

  }

  return isLive ? (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button className='bg-important-color min-h-[52px] w-screen' onClick={handleMint}>
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
