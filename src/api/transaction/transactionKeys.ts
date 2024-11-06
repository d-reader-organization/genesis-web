import { MintParams } from '@/models/transaction/mint'
import { CancelBidParams } from '@/models/transaction/cancelBid'
import { CancelListingParams } from '@/models/transaction/cancelListing'
import { InstantBuyParams } from '@/models/transaction/instantBuy'
import { ListParams } from '@/models/transaction/list'
import { MultipleBuyParams } from '@/models/transaction/multipleBuy'
import { PrivateBidParams } from '@/models/transaction/privateBid'
import { SignComicParams } from '@/models/transaction/signComic'
import { TipCreatorParams } from '@/models/transaction/tipCreator'
import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { ExpressInterestParams } from '@/models/transaction/expressInterest'

export const TRANSACTION_QUERY_KEYS = Object.freeze({
  TRANSACTION: 'transaction',
  MINT_ONE: 'mint-one',
  MINT: 'mint',
  SIGN_COMIC: 'sign-comic',
  USE_COMIC_ISSUE_ASSET: 'use-comic-issue-asset',
  SEND_MINT_TRANSACTION: 'send-mint-transaction',
  LIST: 'list',
  PRIVATE_BID: 'private-bid',
  INSTANT_BUY: 'instant-buy',
  TIP_CREATOR: 'tip-creator',
  MULTIPLE_BUY: 'multiple-buy',
  CANCEL_BID: 'cancel-bid',
  CANCEL_LISTING: 'cancel-listing',
  EXPRESS_INTEREST: 'express-interest',
})

export const transactionKeys = Object.freeze({
  mint: (params: MintParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.MINT_ONE,
    params.candyMachineAddress,
    params.numberOfItems,
    params.label,
    params.couponId,
    params.minterAddress,
  ],
  signComic: (params: SignComicParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.SIGN_COMIC,
    params.assetAddress,
    params.signerAddress,
  ],
  useComicIssueAsset: (params: UseComicIssueAssetParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.USE_COMIC_ISSUE_ASSET,
    params.assetAddress,
    params.ownerAddress,
  ],
  list: (params: ListParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.LIST,
    params.mintAccount,
    params.sellerAddress,
    params.price,
    params.printReceipt,
  ],
  privateBid: (params: PrivateBidParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.PRIVATE_BID,
    params.buyerAddress,
    params.mintAccount,
    params.price,
    params.printReceipt,
    params.sellerAddress,
  ],
  instantBuy: (params: InstantBuyParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.INSTANT_BUY,
    params.buyerAddress,
    params.mintAccount,
    params.price,
    params.sellerAddress,
  ],
  tipCreator: (params: TipCreatorParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.TIP_CREATOR,
    params.creatorId,
    params.tipAmount,
    params.splTokenAddress,
  ],
  multipleBuy: (paramsArray: MultipleBuyParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.MULTIPLE_BUY,
    paramsArray,
  ],
  cancelBid: (params: CancelBidParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.CANCEL_BID,
    params.assetAddress,
    params.receiptAddress,
  ],
  cancelListing: (params: CancelListingParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.CANCEL_LISTING,
    params.assetAddress,
    params.receiptAddress,
  ],
  expressInterest: (params: ExpressInterestParams) => [
    TRANSACTION_QUERY_KEYS.TRANSACTION,
    TRANSACTION_QUERY_KEYS.EXPRESS_INTEREST,
    params.walletAddress,
    params.projectSlug,
    params.splTokenAddress,
  ],
})
