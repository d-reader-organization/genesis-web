export const usernameTooltip = `Your username will be visible to the dReader community`
export const payoutDetails: string =
  '*Previous payouts are not indicative of future results, and no representation is made that any investment will or is likely to achieve profits or losses similar to those discussed on this website. All investments involve risks, and the value of investments may fluctuate over time.'

export const roiTooltip = (roiPercent: number) =>
  `This means that the issuer returned 100% of the initial investment amount for each investor plus ${roiPercent - 100}% of that initial investment. So if an  investor invested $100, the issuer returned $100 + $${roiPercent} which equals $${100 + roiPercent}.`
