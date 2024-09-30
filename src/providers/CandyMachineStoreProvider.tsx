'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { useStore } from 'zustand'
import { type CandyMachineStore, createCandyMachineStore } from '@/stores/candy-machine-store'
import { useFetchCandyMachine } from '@/api/candyMachine/queries/useFetchCandyMachine'
import { ComicIssue } from '@/models/comicIssue'
import { useWallet } from '@solana/wallet-adapter-react'
import { useFetchSupportedTokens } from '@/api/settings/queries/useFetchSupportedTokens'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { getPublicCoupon } from '@/utils/mint'
import { WRAPPED_SOL_MINT } from '@metaplex-foundation/js'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import React from 'react'

export type CandyMachineStoreApi = ReturnType<typeof createCandyMachineStore>

export const CandyMachineStoreContext = createContext<CandyMachineStoreApi | undefined>(undefined)

export type CandyMachineStoreProviderProps = {
  comicIssue: ComicIssue
  children: ReactNode
}

export const CandyMachineStoreProvider = ({ comicIssue, children }: CandyMachineStoreProviderProps) => {
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
  useAuthorizeWallet(refetch)

  const storeRef = useRef<CandyMachineStoreApi>()
  if (!storeRef.current) {
    const publicCoupon = getPublicCoupon(candyMachine?.coupons ?? [])
    const prices = publicCoupon?.prices ?? []
    const solCurrencySetting = prices.find((price) => price.splTokenAddress == WRAPPED_SOL_MINT.toString())
    storeRef.current = createCandyMachineStore({
      coupons: [],
      isLoading,
      numberOfItems: 1,
      supportedTokens: supportedTokens ?? [],
      candyMachine: candyMachine ?? undefined,
      selectedCoupon: getPublicCoupon(candyMachine?.coupons ?? []),
      selectedCurrency: solCurrencySetting,
    })
  }

  useEffect(() => {
    storeRef.current?.setState({ candyMachine: candyMachine ?? undefined, isLoading, supportedTokens })
  }, [candyMachine, isLoading, supportedTokens])

  useEffect(() => {
    if (candyMachine) {
      const publicCoupon = getPublicCoupon(candyMachine.coupons ?? [])
      const solCurrencySetting = publicCoupon?.prices.find(
        (price) => price.splTokenAddress == WRAPPED_SOL_MINT.toString()
      )
      storeRef.current?.setState({
        coupons: (candyMachine?.coupons ?? []).filter(
          (coupon) => !(coupon.type === CouponType.PublicUser || coupon.name === 'dAuth')
        ),
        selectedCoupon: publicCoupon,
        selectedCurrency: solCurrencySetting,
      })
    }
  }, [candyMachine])

  return <CandyMachineStoreContext.Provider value={storeRef.current}>{children}</CandyMachineStoreContext.Provider>
}

export const useCandyMachineStore = <T,>(selector: (store: CandyMachineStore) => T): T => {
  const counterStoreContext = useContext(CandyMachineStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCandyMachineStore must be used within CandyMachineStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}