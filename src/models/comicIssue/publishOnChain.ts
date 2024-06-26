import { ComicIssue } from '.'

export interface PublishOnChainData
	extends Pick<ComicIssue, 'royaltyWallets' | 'supply' | 'mintPrice' | 'discountMintPrice' | 'creatorAddress'> {
	startDate: string
	endDate: string
	publicMintLimit?: number
	freezePeriod?: number
	sellerFeeBasisPoints: ComicIssue['sellerFee']
}
