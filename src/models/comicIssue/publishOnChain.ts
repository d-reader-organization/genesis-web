import { ComicIssue } from '.'

export interface PublishOnChainData extends Pick<ComicIssue, 'royaltyWallets' | 'supply' | 'mintPrice'> {
  startDate: string
  endDate: string
  publicMintLimit?: number
  freezePeriod?: number
  sellerFeeBasisPoints: number
  creatorAddress: string
}
