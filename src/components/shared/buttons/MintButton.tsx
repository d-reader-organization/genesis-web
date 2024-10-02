'use client'

import { checkIfCouponIsActive, getMintPrice, validateMintEligibilty } from '@/utils/mint'
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
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { VersionedTransaction } from '@solana/web3.js'
import Image from 'next/image'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const MintButton: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const { candyMachine, selectedCoupon, numberOfItems, selectedCurrency, supportedTokens } = useCandyMachineStore(
    (state) => state
  )
  const [showAssetMinted, toggleAssetMinted] = useToggle()
  // const [showEmailVerification, toggleEmailVerification] = useToggle()
  // const [showWalletNotConnected, toggleWalletNotConnected] = useToggle()
  const [showConfirmingTransaction, toggleConfirmingTransaction, closeConfirmingTransaction] = useToggle()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState(false)
  const [assetAddress, setAssetAddress] = useState<string>()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

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
      closeConfirmingTransaction()
      toggleAssetMinted()
      clearTimeout(timeoutId)
      setTimeoutId(undefined)
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
      setIsMintTransactionLoading(false)
      return
    }

    const isMintValid = validateMintEligibilty(updatedCandyMachine?.coupons, selectedCoupon.id)
    if (!isMintValid) {
      toast({ description: "You're not eligible for the mint", variant: 'error' })
    }

    let mintTransactions: VersionedTransaction[] = []
    try {
      const transactions = await fetchMintTransaction({
        candyMachineAddress: updatedCandyMachine.address,
        minterAddress: walletAddress,
        couponId: selectedCoupon.id,
        label: selectedCurrency.label,
        numberOfItems: numberOfItems ?? 1,
      })
      if (!transactions || !transactions.length) {
        throw new Error()
      }
      mintTransactions = transactions.map(versionedTransactionFromBs64)
    } catch (e) {
      console.log(e)
      setIsMintTransactionLoading(false)
      toast({ description: 'Error while minting, try again', variant: 'error' })
    }

    if (!mintTransactions.length) return

    if (!signAllTransactions) {
      return toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
    }

    try {
      const signedTransactions = await signAllTransactions(mintTransactions)
      setIsMintTransactionLoading(false)
      toggleConfirmingTransaction()

      clearTimeout(timeoutId)
      const id = setTimeout(() => {
        closeConfirmingTransaction()
        toast({
          description: 'Network is congested, your transaction might have failed. Please check your wallet',
          variant: 'error',
        })
        setTimeoutId(undefined)
      }, 20 * 1000)
      setTimeoutId(id)

      const serializedTransactions: string[] = []
      for (const transaction of signedTransactions) {
        try {
          const serializedTransaction = Buffer.from(transaction.serialize()).toString('base64')
          serializedTransactions.push(serializedTransaction)
        } catch (e) {
          clearTimeout(timeoutId)
          setIsMintTransactionLoading(false)
          closeConfirmingTransaction()
          toast({
            description: 'Something went wrong',
            variant: 'error',
          })
        }
      }
      await sendMintTransaction(walletAddress, serializedTransactions)
    } catch (e) {
      console.log(e)
      clearTimeout(timeoutId)
      setIsMintTransactionLoading(false)
      closeConfirmingTransaction()
    }
  }

  const mintPrice =
    selectedCoupon?.prices.find((price) => {
      return price.splTokenAddress === selectedCurrency?.splTokenAddress
    })?.mintPrice ?? 0
  const splToken = supportedTokens?.find((token) => token.address === selectedCurrency?.splTokenAddress)

  return isLive ? (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button className='bg-important-color min-h-[52px] w-full' onClick={handleMint}>
            {!isMintTransactionLoading ? (
              <div className='flex items-center gap-1.5 text-base font-bold leading-[22.4px]'>
                <span>Purchase</span>
                <Image
                  alt='currency'
                  src={splToken?.icon ?? splToken?.symbol ?? ''}
                  width={14}
                  height={14}
                  className='h-3.5 w-3.5'
                />
                <span>{getMintPrice(mintPrice, splToken?.decimals ?? 1) * numberOfItems}</span>
              </div>
            ) : (
              <Loader />
            )}
          </Button>
        ) : (
          <>
            <Button className='min-h-[52px] w-full' disabled>
              Not eligible
            </Button>
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
