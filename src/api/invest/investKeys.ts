export const INVEST_QUERY_KEYS = Object.freeze({
  INVEST: 'invest',
  GET: 'get',
  EXPRESS_INTEREST: 'express-interest',
  TRANSACTION: 'transaction',
  INTEREST_RECEIPTS: 'interest-receipts',
})

export const investKeys = Object.freeze({
  getMany: () => [INVEST_QUERY_KEYS.INVEST, INVEST_QUERY_KEYS.GET],
  get: (id: string | number) => [INVEST_QUERY_KEYS.INVEST, INVEST_QUERY_KEYS.GET, id],
  getUserInterestedReceipts: (slug: string) => [
    INVEST_QUERY_KEYS.INVEST,
    INVEST_QUERY_KEYS.GET,
    slug,
    INVEST_QUERY_KEYS.INTEREST_RECEIPTS,
  ],
})
