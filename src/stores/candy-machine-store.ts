import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineCoupon, CouponCurrencySetting } from '@/models/candyMachine/candyMachineCoupon'
import { SplToken } from '@/models/settings/splToken'
import { getPublicCoupon } from '@/utils/mint'
import { WRAPPED_SOL_MINT } from '@metaplex-foundation/js'
import { createStore } from 'zustand/vanilla'

export type CandyMachineState = {
  coupons: CandyMachineCoupon[]
  candyMachine?: CandyMachine
  isLoading: boolean
  numberOfItems: number
  supportedTokens: SplToken[]
  selectedCoupon?: CandyMachineCoupon
  selectedCurrency?: CouponCurrencySetting
}

export type CandyMachineActions = {
  updateSelectedCoupon: (coupon: CandyMachineCoupon) => void
  updateSelectedCurrency: (currency?: CouponCurrencySetting) => void
  updateNumberOfItems: (value: number) => void
}

export type CandyMachineStore = CandyMachineState & CandyMachineActions

export const defaultInitState: CandyMachineState = {
  coupons: [],
  isLoading: false,
  numberOfItems: 1,
  supportedTokens: [],
}

export const createCandyMachineStore = (initState: CandyMachineState = defaultInitState) => {
  return createStore<CandyMachineStore>()((set) => ({
    ...initState,
    updateSelectedCoupon: (coupon: CandyMachineCoupon) =>
      set((state) => {
        if (state.selectedCoupon?.id === coupon.id) {
          const publicCoupon = getPublicCoupon(state.candyMachine?.coupons ?? [])
          const solCurrencySetting = publicCoupon?.prices.find(
            (price) => price.splTokenAddress == WRAPPED_SOL_MINT.toString()
          )
          return {
            selectedCoupon: publicCoupon,
            selectedCurrency: solCurrencySetting,
          }
        }
        const solCurrencySetting = coupon.prices.find((price) => price.splTokenAddress == WRAPPED_SOL_MINT.toString())
        return {
          selectedCoupon: coupon,
          selectedCurrency: solCurrencySetting,
        }
      }),
    updateSelectedCurrency: (currency?: CouponCurrencySetting) => set((_) => ({ selectedCurrency: currency })),
    updateNumberOfItems: (value: number) =>
      set((state) => {
        const numberOfRedemptions = state.selectedCoupon?.numberOfRedemptions ?? 4
        if (value > 0 && value <= Math.min(numberOfRedemptions, 4)) {
          return { numberOfItems: value }
        }
        return { numberOfItems: state.numberOfItems }
      }),
  }))
}
