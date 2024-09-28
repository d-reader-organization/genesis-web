import { CandyMachineCoupon, CouponCurrencySetting, CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { SplToken } from '@/models/settings/splToken'

export type TokenDetail = {
  label: string,
  name: string,
  address: string,
  price: string,
  icon: string,
  symbol: string,
}

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
  if(!publicCoupon)return 0;

  const publicCouponUsdcPrice = publicCoupon?.prices[0].usdcEquivalent
  const currentCouponUsdcPrice = currentCoupon.prices[0].usdcEquivalent

  if (!publicCouponUsdcPrice) return 0

  const difference = Math.abs(publicCouponUsdcPrice - currentCouponUsdcPrice) * 100
  const discount = Math.ceil(difference / publicCouponUsdcPrice)
  return discount
}

export const getTokenMap = (currencySettings:CouponCurrencySetting[],splTokens:SplToken[]) => {
  const tokenMap = new Map<string,TokenDetail>();
  for(const setting of currencySettings){
    const splToken = splTokens.find(token=>token.address == setting.splTokenAddress);
    if(!splToken)continue;
    tokenMap.set(setting.label,{
      label: setting.label,
      name: splToken.name,
      address: splToken.address,
      price: getMintPrice(setting.mintPrice,splToken.decimals),
      icon: splToken.icon,
      symbol: splToken.symbol,
    })
  }
  return tokenMap;
}

export const getMintPrice = (basePrice:number,decimals:number) => {
  const denominator = Math.pow(10,decimals);
  const price = (basePrice/denominator).toFixed(3);

  return price;
}