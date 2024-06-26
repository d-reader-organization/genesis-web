import { PartialGenre } from '../genre'
import { RawComicIssueStats } from './rawComicIssueStats'
import { StatefulCover } from './statefulCover'
import { StatelessCover } from './statelessCover'
import { RoyaltyWallet } from './royaltyWallet'
import { ComicIssueCollaborator } from './comicIssueCollaborator'

export interface RawComicIssue {
	id: number
	number: number
	supply: number
	discountMintPrice: number
	mintPrice: number
	sellerFeeBasisPoints: number
	title: string
	slug: string
	description: string
	flavorText: string
	cover: string
	signature: string
	releaseDate: string
	isFreeToRead: boolean
	isFullyUploaded: boolean
	publishedAt: Date
	popularizedAt: Date
	verifiedAt: Date
	comicSlug: string
	genres: PartialGenre[]
	stats: RawComicIssueStats
	creatorAddress: string
	creatorBackupAddress: string
	collaborators: ComicIssueCollaborator[]
	statefulCovers: StatefulCover[]
	statelessCovers: StatelessCover[]
	royaltyWallets: RoyaltyWallet[]
}

export type RawComicIssueArray = Array<
	RawComicIssue & {
		collaborators?: RawComicIssue['collaborators']
		statelessCovers?: RawComicIssue['statelessCovers']
		royaltyWallets?: RawComicIssue['royaltyWallets']
	}
>
