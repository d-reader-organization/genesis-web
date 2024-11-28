import { CandyMachineCoupon, CouponCurrencySetting, CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { SplToken } from '@/models/settings/splToken'
import { WRAPPED_SOL_MINT } from '@metaplex-foundation/js'

export type TokenDetail = {
  label: string
  name: string
  address: string
  price: number
  icon: string
  symbol: string
}
const COMIC_VAULT_LABEL = 'dAuth'

export const validateMintEligibilty = (coupons: CandyMachineCoupon[], couponId: number | undefined) => {
  if (!couponId) {
    return { isEligible: false, error: `Please select a valid coupon` }
  }
  const selectedCoupon = coupons.find((coupon) => coupon.id == couponId)

  const isEligible = selectedCoupon?.stats.isEligible || undefined
  const isMintLimitReached = selectedCoupon?.numberOfRedemptions
    ? (selectedCoupon?.stats.itemsMinted || 0) >= selectedCoupon?.numberOfRedemptions
    : false

  if (isMintLimitReached) return { isEligible: false, error: `Your Mint Limit Reached.` }
  else if (!isEligible) return { isEligible: false, error: `Not Eligible` }

  return { isEligible: true }
}

export const checkIfCouponIsActive = (coupon: CandyMachineCoupon) => {
  const startDate = new Date(coupon.startsAt)
  const endDate = coupon.expiresAt ? new Date(coupon.expiresAt) : undefined
  const currentDate = new Date(new Date().toUTCString())

  return startDate <= currentDate && (!endDate || (endDate && currentDate <= endDate))
}

export const getPublicCoupon = (coupons: CandyMachineCoupon[]) => {
  return coupons.find((coupon) => coupon.type == CouponType.PublicUser)
}

export const getUserCoupon = (coupons: CandyMachineCoupon[]) => {
  return coupons.find((coupon) => coupon.type == CouponType.RegisteredUser)
}
export const getDefaultCoupon = (coupons: CandyMachineCoupon[], isAuthenticatedUser?: boolean) =>
  isAuthenticatedUser ? (getUserCoupon(coupons) ?? getPublicCoupon(coupons)) : getPublicCoupon(coupons)

/** Currently assume that all coupon will contain sol as currency */
export const getCouponDiscount = (coupons: CandyMachineCoupon[], currentCoupon: CandyMachineCoupon) => {
  const publicCoupon = getPublicCoupon(coupons)
  if (!publicCoupon) return 0

  const getSolPrice = (coupon: CandyMachineCoupon) =>
    coupon.prices.find((price) => price.splTokenAddress === WRAPPED_SOL_MINT.toString())?.mintPrice || 0
  const publicCouponPrice = getSolPrice(publicCoupon)
  const currentCouponPrice = getSolPrice(currentCoupon)

  if (!publicCouponPrice) return 0

  const difference = Math.abs(publicCouponPrice - currentCouponPrice) * 100
  const discount = Math.ceil(difference / publicCouponPrice)
  return Math.min(discount, 100)
}

export const getTokenMap = (currencySettings: CouponCurrencySetting[], splTokens: SplToken[]) => {
  const tokenMap = new Map<string, TokenDetail>()
  for (const setting of currencySettings) {
    const splToken = splTokens.find((token) => token.address == setting.splTokenAddress)
    if (!splToken) continue
    tokenMap.set(setting.label, {
      label: setting.label,
      name: splToken.name,
      address: splToken.address,
      price: getMintPrice(setting.mintPrice, splToken.decimals),
      icon: splToken.icon,
      symbol: splToken.symbol,
    })
  }
  return tokenMap
}

export const getMintPrice = (basePrice: number, decimals: number) => {
  const denominator = Math.pow(10, decimals)
  const price = parseFloat((basePrice / denominator).toFixed(3))

  return price
}

export const getTotalItemsMintedByUser = (coupons: CandyMachineCoupon[]) => {
  let itemsMinted = 0
  for (const coupon of coupons) {
    itemsMinted += coupon.stats.itemsMinted || 0
  }
  return itemsMinted
}

export const getRaritySupply = (totalSupply: number, rarityShare: number) => {
  const supply = Math.floor((totalSupply * rarityShare) / 100)
  return supply
}

export const isComicVaultCoupon = (coupon: CandyMachineCoupon) => {
  return coupon.prices.some((currency) => currency.label == COMIC_VAULT_LABEL)
}
