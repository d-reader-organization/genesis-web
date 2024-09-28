'use client'

import { CandyMachine } from '@/models/candyMachine'
import React, { Dispatch, useEffect, useState } from 'react'
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
import { CandyMachineCoupon, CouponCurrencySetting } from '@/models/candyMachine/candyMachineCoupon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Skeleton } from '../ui/Skeleton'
import { Divider } from './Divider'
import { CouponsSection } from '../mint/CouponsSection'
import { getCouponDiscount, getTokenMap, TokenDetail } from '@/utils/mint'
import { WRAPPED_SOL_MINT } from '@metaplex-foundation/js'

const normalise = (value: number, MAX: number): number => (value * 100) / MAX
type DetailsProps = { candyMachine: CandyMachine, selectedCoupon: CandyMachineCoupon }
type Props = { comicIssue: ComicIssue; isAuthenticated: boolean }

export const CandyMachineDetails: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const { publicKey } = useWallet()
  const {
    data: candyMachine,
    refetch,
    isLoading,
  } = useFetchCandyMachine({
    candyMachineAddress: comicIssue.activeCandyMachineAddress ?? '',
    walletAddress: publicKey?.toBase58() ?? '',
  })
  const { data: supportedTokens } = useFetchSupportedTokens()
 
  // for certain future, all candymachine must have a public coupon that will act as a default coupon
  const [selectedCoupon,setCoupon] = useState<CandyMachineCoupon>()
  const [selectedCurrency, setCurrency] = useState<CouponCurrencySetting>();
  const [numberOfItems,setNumberOfItems] = useState('1');
  
  useAuthorizeWallet(refetch)

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    candyMachine &&  (
      <div>
      {selectedCoupon && <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 max-h-fit max-w-[800px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] mb-2'>
        <CouponDetails
          candyMachine={candyMachine}
          supportedTokens={supportedTokens ?? []}
          isAuthenticated={isAuthenticated}
          selectedCoupon={selectedCoupon}
          setCurrency={setCurrency}
          selectedCurrency={selectedCurrency}
        />
        <UserDetails candyMachine={candyMachine} selectedCoupon={selectedCoupon} />
        <ProgressBar value={normalise(candyMachine.itemsMinted + 2, candyMachine.supply)} />
        <ComicVault />
        <PurchaseRow
          comicIssue={comicIssue}
          candyMachine={candyMachine}
          isAuthenticated={isAuthenticated}
          numberOfItems={numberOfItems}
          selectedCurrency={selectedCurrency}
          selectedCoupon={selectedCoupon}
          className='max-md:fixed max-md:bottom-0 max-md:z-50 max-md:bg-grey-600 max-md:backdrop-blur-[2px]'
        />
      </div>}
      <Divider className='max-md:hidden' />
      <CouponsSection candyMachine={candyMachine} setCoupon={setCoupon} selectedCoupon={selectedCoupon} />
      </div>
    )
  )
}

const LoadingSkeleton: React.FC = () => (
  <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 max-h-fit max-w-[800px]'>
    <CouponSkeleton />
    <div className='h-[19.6px] md:h-[22.4px] w-full flex items-center justify-between'>
      <Skeleton className='h-[19.6px] md:h-[22.4px] w-32' />
      <Skeleton className='h-[19.6px] md:h-[22.4px] w-10' />
    </div>
    <Skeleton className='h-2' />
    <Skeleton className='h-12 w-11/12' />
    <div className='max-md:hidden h-[52px] flex gap-4 items-center'>
      <Skeleton className='h-full w-40' />
      <Skeleton className='h-full w-40' />
    </div>
  </div>
)

const CouponDetails: React.FC<DetailsProps & { isAuthenticated: boolean; supportedTokens: SplToken[]; selectedCurrency: CouponCurrencySetting | undefined; setCurrency: Dispatch<React.SetStateAction<CouponCurrencySetting | undefined>>}> = ({
  candyMachine,
  isAuthenticated,
  selectedCurrency,
  setCurrency,
  supportedTokens,
  selectedCoupon
}) => {
  const { startsAt, expiresAt, prices } = selectedCoupon
  // Initialize currencySetting state
  const solCurrencySetting = prices.find(price => price.splTokenAddress == WRAPPED_SOL_MINT.toString());

  useEffect(()=>{
    if(!selectedCurrency){
      setCurrency(solCurrencySetting)
    }
  },[]);

  const { countdownString } = useCountdown({ expirationDate: startsAt.toString() })
  const highlightDiscount = getCouponDiscount(candyMachine.coupons,selectedCoupon)

  const tokenMap = getTokenMap(selectedCoupon.prices,supportedTokens);
  const selectedCurrencySetting = selectedCurrency ? tokenMap.get(selectedCurrency.label) : undefined;

  return prices.length && selectedCurrencySetting ? (
    <CurrencyExpandable selectedCurrencySetting={selectedCurrencySetting}>
      {prices.map((setting) => {
        const token = tokenMap.get(setting.label);
        if(!token)return null;
        return <CurrencyRow key={setting.label} isSelected={selectedCurrency?.label==setting.label} setCurrency={setCurrency} currencySetting={setting} token={token}/>
      })}
    </CurrencyExpandable>
  ) : (
    <CouponSkeleton />
  )
}

const CouponSkeleton: React.FC = () => (
  <div className='flex items-center justify-between h-9 md:h-10'>
    <Skeleton className='h-9 md:h-10 w-20' />
    <Skeleton className='h-9 md:h-10 w-28' />
  </div>
)

type CurrencyRowProps = {
  isSelected?: boolean
  setCurrency: Dispatch<React.SetStateAction<CouponCurrencySetting | undefined>>
  currencySetting: CouponCurrencySetting
  token: TokenDetail
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ isSelected = false, token, setCurrency, currencySetting }) => {
  return (
    <button
      className={cn(
        'flex justify-between items-center p-4 rounded-2xl border border-grey-300 bg-grey-600',
        isSelected && 'border border-yellow-500 bg-yellow-500 bg-opacity-[0.08]'
      )}
      onClick={()=>setCurrency(currencySetting)}
    >
      <div className='flex items-center gap-2'>
        <Image alt='currency' src={token.icon} width={16} height={16} />
        <span className='text-base font-medium leading-[22.4px]'>{token.name}</span>
      </div>
      <span className='text-base font-medium leading-[22.4px]'>{token.price}</span>
    </button>
  )
}

const UserDetails: React.FC<DetailsProps> = ({ candyMachine, selectedCoupon }) => {
  const numberOfRedemptions = selectedCoupon.numberOfRedemptions;
  const itemsMinted = selectedCoupon.stats.itemsMinted;

  return (
    <div className='flex justify-between text-center text-grey-100 text-sm md:text-base font-medium leading-[19.6px] md:leading-[22.4px]'>
      <span>
        You minted: {itemsMinted}/{numberOfRedemptions ?? '∞'}
      </span>
      <span>
        {candyMachine.itemsMinted}/{candyMachine.supply}
      </span>
    </div>
  )
}

const ComicVault: React.FC = () => (
  <Expandable
    className='bg-grey-400 border-transparent rounded-2xl max-w-[800px] h-12'
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

type PurchaseRowProps = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
  candyMachine: CandyMachine
  selectedCoupon: CandyMachineCoupon
  selectedCurrency: CouponCurrencySetting | undefined
  numberOfItems: string
} & React.HTMLAttributes<HTMLDivElement>

export const PurchaseRow: React.FC<PurchaseRowProps> = ({ comicIssue, className, isAuthenticated, selectedCoupon, candyMachine, selectedCurrency, numberOfItems }) => {
  // const { publicKey } = useWallet()
  // const { data: candyMachine } = useFetchCandyMachine({
  //   candyMachineAddress: comicIssue.activeCandyMachineAddress ?? '',
  //   walletAddress: publicKey?.toBase58() ?? '',
  // })
  // if (!candyMachine) {
  //   return null
  // }
  return (
    <div className={cn('flex gap-4 items-center max-h-[52px]', className)}>
      <NumberOfItemsWidget />
      <MintButton candyMachine={candyMachine} selectedCoupon={selectedCoupon} selectedCurrency={selectedCurrency} comicIssue={comicIssue} isAuthenticated={isAuthenticated} numberOfItems={numberOfItems}/>
    </div>
  )
}

// TODO design system mobile component
const NumberOfItemsWidget: React.FC = () => {
  return (
    <div className='max-h-[52px] min-w-[150px] p-2.5 flex justify-between items-center rounded-xl bg-grey-400'>
      <IconWrapper>
        <MinusIcon className='size-4 md:size-5' />
      </IconWrapper>
      <span className='text-sm md:text-base font-medium leading-[19.6px] md:leading-[22.4px]'>5</span>
      <IconWrapper>
        <PlusIcon className='size-4 md:size-5' />
      </IconWrapper>
    </div>
  )
}

const IconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <button className='flex p-2 justify-center rounded-lg bg-grey-500 '>{children}</button>
}
