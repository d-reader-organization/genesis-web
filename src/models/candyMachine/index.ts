import { CandyMachineCoupon } from './candyMachineCoupon'

export type CandyMachine = {
  address: string
  supply: number
  discount: number
  itemsMinted: number
  coupons: CandyMachineCoupon[]
}

export type LaunchpadModel = {
  id: string
  issueTitle: string
  price: number
  supply: number
  minted: number
  image: string
  startsAt?: Date
}
