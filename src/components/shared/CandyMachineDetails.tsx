'use client'

import { CandyMachine } from '@/models/candyMachine'
import React, { useState } from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ProgressBar } from './ProgressBar'
import { CurrencyExpandable, Expandable } from './Expandable'
import LockIcon from 'public/assets/vector-icons/lock.svg'
import { MintButton } from './buttons/MintButton'
import { ComicIssue } from '@/models/comicIssue'
import { useFetchCandyMachine } from '@/api/candyMachine/queries/useFetchCandyMachine'
import { useWallet } from '@solana/wallet-adapter-react'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { useCountdown } from '@/hooks/useCountdown'
import { useFetchSupportedTokens } from '@/api/settings'
import { SplToken } from '@/models/settings/splToken'
import { CandyMachineCoupon } from '@/models/candyMachine/candyMachineCoupon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from 'lucide-react'

const toSol = (lamports: number) => +(lamports / LAMPORTS_PER_SOL).toFixed(3)
const normalise = (value: number, MAX: number): number => (value * 100) / MAX

type DetailsProps = { candyMachine: CandyMachine }

const getItemsMinted = (candyMachine: CandyMachine) => {
  return candyMachine.coupons.at(0)?.stats.itemsMinted ?? 0
}

type Props = { comicIssue: ComicIssue; isAuthenticated: boolean }

export const CandyMachineDetails: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const { publicKey } = useWallet()
  const { data: candyMachine, refetch } = useFetchCandyMachine({
    candyMachineAddress: comicIssue.activeCandyMachineAddress ?? '',
    walletAddress: publicKey?.toBase58() ?? '',
  })
  const { data: supportedTokens } = useFetchSupportedTokens()
  useAuthorizeWallet(refetch)

  // TODO SKELETON
  // <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 border border-grey-200 mb-6 max-h-fit min-h-[320px] max-w-[800px] w-full'><Skeleton className='h-5'/></div>
  return (
    candyMachine && (
      <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 border border-grey-200 mb-6 max-h-fit'>
        <CouponDetails
          candyMachine={candyMachine}
          supportedTokens={supportedTokens ?? []}
          isAuthenticated={isAuthenticated}
        />
        <UserDetails candyMachine={candyMachine} />
        <ProgressBar value={normalise(candyMachine.itemsMinted + 2, candyMachine.supply)} />
        <ComicVault />
        <PurchaseRow>
          <MintButton candyMachine={candyMachine} comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
        </PurchaseRow>
      </div>
    )
  )
}

const CouponDetails: React.FC<DetailsProps & { isAuthenticated: boolean; supportedTokens: SplToken[] }> = ({
  candyMachine,
  isAuthenticated,
  supportedTokens,
}) => {
  const coupons = candyMachine.coupons
  const coupon = candyMachine.coupons.at(0) as CandyMachineCoupon
  const [selectedCoupon, setSelectedCoupon] = useState<number>(coupon.id)
  const { startsAt, expiresAt, prices } = candyMachine.coupons.at(0) as CandyMachineCoupon
  const isLive = new Date(startsAt) <= new Date() && new Date(expiresAt) > new Date()
  const isEnded = new Date() > new Date(expiresAt)
  const { countdownString } = useCountdown({ expirationDate: startsAt.toString() })
  const highlightDiscount = isAuthenticated && candyMachine.discount
  const mintPrice = prices.at(0)?.mintPrice ?? 0
  // couponslength
  return supportedTokens.length ? (
    <CurrencyExpandable supportedTokens={supportedTokens}>
      {supportedTokens.map((token) => (
        <CurrencyRow key={token.address} price={250} token={token} isSelected={token.id === 4} />
      ))}
    </CurrencyExpandable>
  ) : null
}

type CurrencyRowProps = {
  isSelected?: boolean
  price: number
  token: SplToken
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ isSelected = false, price, token }) => {
  return (
    <button
      className={cn(
        'flex justify-between items-center p-4 rounded-2xl border border-grey-300 bg-grey-600',
        isSelected && 'border border-yellow-500 bg-yellow-500 bg-opacity-[0.08]'
      )}
    >
      <div className='flex gap-2'>
        <Image alt='currency' src={token.icon} width={16} height={16} />
        <span className='text-base font-medium leading-[22.4px]'>{token.name}</span>
      </div>
      <span className='text-base font-medium leading-[22.4px]'>{price}</span>
    </button>
  )
}

const UserDetails: React.FC<DetailsProps> = ({ candyMachine }) => {
  const itemsMintedPerUserOrWallet = getItemsMinted(candyMachine)
  const mintLimit = candyMachine.coupons.at(0)?.numberOfRedemptions
  return (
    <div className='flex justify-between text-center text-grey-100 text-base font-medium leading-[22.4px]'>
      <span>
        You minted: {itemsMintedPerUserOrWallet}/{mintLimit ?? '∞'}
      </span>
      <span>
        {candyMachine.itemsMinted}/{candyMachine.supply}
      </span>
    </div>
  )
}

const ComicVault: React.FC = () => (
  <Expandable
    className='bg-grey-400 border-transparent rounded-2xl max-w-[800px]'
    title='Comic Vault'
    titleComponent={
      <div className='flex gap-2 items-center text-sm sm:text-base font-medium leading-5 text-grey-100'>
        <LockIcon className='size-4' />
        <span className='text-base font-medium leading-[22.4px] text-grey-100'>Comic Vault</span>
      </div>
    }
    hideArrow
  >
    <p className='text-grey-100 text-sm m-0 leading-5 sm:text-lg'>
      Comic Vault stores portion of the supply of each issue to later use in giveaways & other activities where we
      reward loyal users.
    </p>
  </Expandable>
)

const PurchaseRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex gap-4 items-center max-h-[52px]'>
      <NumberOfItemsWidget />
      {children}
    </div>
  )
}

const NumberOfItemsWidget: React.FC = () => {
  return (
    <div className='max-h-[52px] min-w-[150px] p-2.5 flex justify-between items-center rounded-xl bg-grey-400'>
      <IconWrapper>
        <MinusIcon size={20} />
      </IconWrapper>
      <span className='text-base font-medium leading-[22.4px]'>5</span>
      <IconWrapper>
        <PlusIcon size={20} />
      </IconWrapper>
    </div>
  )
}

const IconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <button className='flex p-2 justify-center rounded-lg bg-grey-500 '>{children}</button>
}
