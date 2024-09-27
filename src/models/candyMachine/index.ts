import { CandyMachineCoupon } from './candyMachineCoupon'

export interface CandyMachine {
  address: string
  supply: number
  discount: number
  itemsMinted: number
  coupons: CandyMachineCoupon[]
}
