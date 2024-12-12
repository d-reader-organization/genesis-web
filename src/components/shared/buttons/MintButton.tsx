'use client'

import { checkIfCouponIsActive, getMintPrice, validateMintEligibilty } from '@/utils/mint'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import { Loader } from '../Loader'
import { AssetMintedDialog } from '../dialogs/AssetMintedDialog'
import { ComicIssue } from '@/models/comicIssue'
// import { EmailVerificationDialog } from './dialogs/EmailVerificationDialog'
// import { NoWalletConnectedDialog } from './dialogs/NoWalletConnectedDialog'
import { ConfirmingTransactionDialog } from '../dialogs/ConfirmingTransactionDialog'
import { useToggle } from '@/hooks'
import { Skeleton, toast } from '../../ui'
import { fetchMintTransaction } from '@/app/lib/api/transaction/queries'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { io } from 'socket.io-client'
import { sendMintTransaction } from '@/app/lib/api/transaction/mutations'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { VersionedTransaction } from '@solana/web3.js'
import Image from 'next/image'
import { AssetMintEvent } from '@/models/asset/assetMintEvent'
import { ConnectButton } from './ConnectButton'
import { cn } from '@/lib/utils'
import { sleep } from '@/utils/helpers'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
  bounce?: boolean
  onMint?: VoidFunction
}

export const MintButton: React.FC<Props> = ({ comicIssue, isAuthenticated, bounce = false, onMint }) => {
  const { candyMachine, selectedCoupon, numberOfItems, selectedCurrency, supportedTokens, refetchCandyMachine } =
    useCandyMachineStore((state) => state)
  const [showAssetMinted, toggleAssetMinted] = useToggle()
  // const [showEmailVerification, toggleEmailVerification] = useToggle()
  // const [showWalletNotConnected, toggleWalletNotConnected] = useToggle()
  const [showConfirmingTransaction, toggleConfirmingTransaction, closeConfirmingTransaction] = useToggle()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState(false)
  const [assetMintEventData, setAssetMintEventData] = useState<AssetMintEvent>()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const { publicKey, signAllTransactions } = useWallet()

  const walletAddress = publicKey?.toBase58()
  const hasWalletConnected = !!walletAddress

  const { isEligible } = validateMintEligibilty(candyMachine?.coupons ?? [], selectedCoupon?.id)
  const isLive = selectedCoupon ? checkIfCouponIsActive(selectedCoupon) : false

  useEffect(() => {
    if (!walletAddress && !isMintTransactionLoading) {
      return
    }
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
    socket.on(`wallet/${walletAddress}/item-minted`, async (assetEventData: AssetMintEvent): Promise<void> => {
      clearTimeout(timeoutId)
      setAssetMintEventData(assetEventData)
      closeConfirmingTransaction()
      setTimeoutId(undefined)
      toggleAssetMinted()
      toast({ description: 'Successfully minted the comic! Find the asset in your wallet', variant: 'success' })
    })

    return () => {
      socket.off(`wallet/${walletAddress}/item-minted`)
      socket.disconnect()
    }
  }, [
    walletAddress,
    isMintTransactionLoading,
    timeoutId,
    closeConfirmingTransaction,
    toggleAssetMinted,
    refetchCandyMachine,
  ])

  const handleMint = async () => {
    if (typeof onMint === 'function') onMint()
    if (!walletAddress || !selectedCurrency) return
    setIsMintTransactionLoading(true)

    //todo: remove this
    await sleep(Math.random() * 6000)

    // figure out what about this
    const updatedCandyMachine = await fetchCandyMachine({
      candyMachineAddress: candyMachine?.address ?? '',
      walletAddress,
    })
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
      const { data: transactions, error } = await fetchMintTransaction({
        candyMachineAddress: updatedCandyMachine.address,
        minterAddress: walletAddress,
        couponId: selectedCoupon.id,
        label: selectedCurrency.label,
        numberOfItems: numberOfItems ?? 1,
      })

      if (error) {
        setIsMintTransactionLoading(false)
        toast({ description: error, variant: 'error' })
        return
      }

      if (!transactions || !transactions.length) {
        throw new Error()
      }

      mintTransactions = transactions.map(versionedTransactionFromBs64)
    } catch (error) {
      console.error(error)
      setIsMintTransactionLoading(false)
      toast({ description: error instanceof Error ? error.message : 'An unknown error occurred', variant: 'error' })
    }

    if (!mintTransactions.length) return

    if (!signAllTransactions) {
      return toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
    }

    try {
      const signedTransactions = await signAllTransactions(mintTransactions)
      setIsMintTransactionLoading(false)
      toggleConfirmingTransaction()

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const id = setTimeout(async () => {
        closeConfirmingTransaction()
        toast({
          description: 'Network might be congested, your transaction might have failed. Please check your wallet',
          variant: 'error',
        })
        setTimeoutId(undefined)
        await refetchCandyMachine()
      }, 30 * 1000)
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

  const price = getMintPrice(mintPrice * numberOfItems, splToken?.decimals ?? 1)
  const isFree = price == 0

  return isLive ? (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button
            className={cn('bg-important-color min-h-[52px] w-full', bounce && 'animate-bounce')}
            onClick={handleMint}
          >
            {!isMintTransactionLoading ? (
              <div className='flex items-center gap-1.5 text-base font-bold leading-[22.4px]'>
                {isFree ? (
                  <span>Claim for free</span>
                ) : (
                  <>
                    <span>Purchase</span>
                    <Image
                      alt={splToken?.name || 'currency'}
                      src={splToken?.icon ?? splToken?.symbol ?? ''}
                      width={14}
                      height={14}
                      className='h-3.5 w-3.5'
                    />
                    <span>{price}</span>
                  </>
                )}
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
        <ConnectButton variant='primary' subVariant={1} size='lg' className='w-full max-md:w-[150px]' text='Connect' />
      )}
      {assetMintEventData ? (
        <AssetMintedDialog
          assets={assetMintEventData.assets}
          comicIssue={comicIssue}
          isAuthenticated={isAuthenticated}
          open={showAssetMinted}
          toggleDialog={async () => {
            await refetchCandyMachine().then(() => toggleAssetMinted())
          }}
        />
      ) : null}
      {/* <EmailVerificationDialog open={showEmailVerification} toggleDialog={toggleEmailVerification} /> */}
      {/* <NoWalletConnectedDialog open={showWalletNotConnected} toggleDialog={toggleWalletNotConnected} /> */}
      <ConfirmingTransactionDialog open={showConfirmingTransaction} toggleDialog={toggleConfirmingTransaction} />
    </>
  ) : (
    <Skeleton className='h-[52px] w-40' />
  )
}
