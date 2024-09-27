import { CandyMachineCoupon, CouponType } from '@/models/candyMachine/candyMachineCoupon'

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

export const getCouponDiscount = (coupons: CandyMachineCoupon[], currentCoupon: CandyMachineCoupon) => {
  const publicCoupon = getPublicCoupon(coupons)
  const publicCouponUsdcPrice = publicCoupon?.prices[0].usdcEquivalent
  const currentCouponUsdcPrice = currentCoupon.prices[0].usdcEquivalent

  if (!publicCouponUsdcPrice) return 0

  const difference = Math.abs(publicCouponUsdcPrice - currentCouponUsdcPrice) * 100
  const discount = Math.ceil(difference / publicCouponUsdcPrice)
  return discount
}
