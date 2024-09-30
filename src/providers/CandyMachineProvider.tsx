'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { ComicIssue } from '@/models/comicIssue'
import { useFetchCandyMachine } from '@/api/candyMachine/queries/useFetchCandyMachine'
import { useFetchSupportedTokens } from '@/api/settings/queries/useFetchSupportedTokens'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { CandyMachineCoupon, CouponCurrencySetting, CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { getPublicCoupon } from '@/utils/mint'
import { CandyMachine } from '@/models/candyMachine'
import { SplToken } from '@/models/settings/splToken'
import { WRAPPED_SOL_MINT } from '@metaplex-foundation/js'

type ReturnType = {
  candyMachine?: CandyMachine | null
  isLoading: boolean
  supportedTokens?: SplToken[]
  selectedCoupon?: CandyMachineCoupon
  updateSelectedCoupon: (coupon: CandyMachineCoupon) => void
  selectedCurrency?: CouponCurrencySetting
  updateSelectedCurrency: (currency?: CouponCurrencySetting) => void
  numberOfItems: number
  updateNumberOfItems: (value: number) => void
  coupons: CandyMachineCoupon[]
}

const CandyMachineContext = createContext<ReturnType | null>(null)

export const useCandyMachine = () => {
  const context = useContext(CandyMachineContext)
  if (!context) {
    throw new Error('useCandyMachine must be used within a CandyMachineProvider')
  }
  return context
}

type Props = {
  comicIssue: ComicIssue
} & React.PropsWithChildren

export const CandyMachineProvider: React.FC<Props> = ({ children, comicIssue }) => {
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

  const [selectedCoupon, setSelectedCoupon] = useState<CandyMachineCoupon>()
  const [selectedCurrency, setSelectedCurrency] = useState<CouponCurrencySetting>()
  const [numberOfItems, setNumberOfItems] = useState<number>(1)

  const updateSelectedCoupon = (coupon: CandyMachineCoupon) => {
    if (selectedCoupon?.id === coupon.id) {
      const publicCoupon = getPublicCoupon(candyMachine?.coupons ?? [])
      setSelectedCoupon(publicCoupon)
    } else {
      setSelectedCoupon(coupon)
    }
  }

  const updateSelectedCurrency = (currency?: CouponCurrencySetting) => {
    setSelectedCurrency(currency)
  }

  const updateNumberOfItems = (value: number) => {
    const numberOfRedemptions = selectedCoupon?.numberOfRedemptions || 4;
    if (value > 0 && value <= Math.min(numberOfRedemptions,4)) {
      setNumberOfItems(value)
    }
  }

  useAuthorizeWallet(refetch)
  const coupons = (candyMachine?.coupons ?? []).filter(
    (coupon) => !(coupon.type === CouponType.PublicUser || coupon.name === 'dAuth')
  )

  useEffect(() => {
    if (candyMachine) {
      const publicCoupon = getPublicCoupon(candyMachine.coupons ?? [])
      setSelectedCoupon(publicCoupon)
    }
  }, [candyMachine])

  useEffect(() => {
    if (!selectedCoupon) return
    const prices = selectedCoupon.prices
    const solCurrencySetting = prices.find((price) => price.splTokenAddress == WRAPPED_SOL_MINT.toString())
    updateSelectedCurrency(solCurrencySetting)
  }, [selectedCoupon])

  const value = {
    candyMachine,
    isLoading,
    supportedTokens,
    selectedCoupon,
    updateSelectedCoupon,
    selectedCurrency,
    updateSelectedCurrency,
    numberOfItems,
    updateNumberOfItems,
    coupons,
  }

  return <CandyMachineContext.Provider value={value}>{children}</CandyMachineContext.Provider>
}
