import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineCoupon, CouponCurrencySetting } from '@/models/candyMachine/candyMachineCoupon'
import { Nullable } from '@/models/common'
import { SplToken } from '@/models/settings/splToken'
import { getCurrencySetting, getPublicCoupon } from '@/utils/mint'
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
  refetchCandyMachine: () => Promise<Nullable<CandyMachine>>
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
    refetchCandyMachine: async () => null,
    updateSelectedCoupon: (coupon: CandyMachineCoupon) =>
      set((state) => {
        if (state.selectedCoupon?.id === coupon.id) {
          const publicCoupon = getPublicCoupon(state.candyMachine?.coupons ?? [])
          return {
            selectedCoupon: publicCoupon,
            selectedCurrency: getCurrencySetting({
              coupon: publicCoupon,
              splTokenAddress: state.selectedCurrency?.splTokenAddress,
            }),
          }
        }
        return {
          selectedCoupon: coupon,
          selectedCurrency: getCurrencySetting({
            coupon,
            splTokenAddress: state.selectedCurrency?.splTokenAddress,
          }),
        }
      }),
    updateSelectedCurrency: (currency?: CouponCurrencySetting) => set(() => ({ selectedCurrency: currency })),
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
