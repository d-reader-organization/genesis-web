export type CandyMachineCoupon = {
  id: number
  name: string
  description: string
  startsAt: string
  expiresAt: string
  numberOfRedemptions: number
  type: CouponType
  stats: CouponStats
  prices: CouponCurrencySetting[]
}

type CouponStats = {
  itemsMinted: number
  isEligible: boolean
}

export type CouponCurrencySetting = {
  label: string
  mintPrice: number
  splTokenAddress: string
  usdcEquivalent: number
}

export enum CouponType {
  PublicUser = 'PublicUser',
  RegisteredUser = 'RegisteredUser',
  WhitelistedUser = 'WhitelistedUser',
  WhitelistedWallet = 'WhitelistedWallet',
}
