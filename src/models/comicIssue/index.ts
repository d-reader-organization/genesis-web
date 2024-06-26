import { Comic } from '../comic'
import { ComicIssueMyStats } from './comicIssueMyStats'
import { ComicIssueStats } from './comicIssueStats'
import { Creator } from '../creator'
import { PartialGenre } from '../genre'
import { ComicIssueCollaborator } from './comicIssueCollaborator'
import { StatefulCover } from './statefulCover'
import { StatelessCover } from './statelessCover'
import { RoyaltyWallet } from './royaltyWallet'

export interface BasicComicIssue {
	id: number
	number: number
	supply: number
	discountMintPrice: number
	mintPrice: number
	sellerFee: number
	title: string
	slug: string
	comicSlug: string
	creatorAddress: string
	description: string
	flavorText: string
	cover: string
	signature: string
	releaseDate: string
	isFreeToRead: boolean
	isFullyUploaded: boolean
	isSecondarySaleActive: boolean
	isPublished: boolean
	isPopular: boolean
	isVerified: boolean
}

export interface ComicIssue extends BasicComicIssue {
	activeCandyMachineAddress?: string
	creator?: Pick<Creator, 'name' | 'slug' | 'isVerified' | 'avatar'>
	comic?: Pick<Comic, 'title' | 'slug' | 'audienceType'>
	genres?: PartialGenre[]
	collaborators?: ComicIssueCollaborator[]
	statefulCovers?: StatefulCover[]
	statelessCovers?: StatelessCover[]
	royaltyWallets?: RoyaltyWallet[]
	stats?: ComicIssueStats
	myStats?: ComicIssueMyStats
}

export interface CreateComicIssueData
	extends Pick<
		ComicIssue,
		| 'title'
		// | 'slug'
		| 'number'
		| 'description'
		| 'flavorText'
		| 'comicSlug'
		| 'isFreeToRead'
	> {
	isFullyUploaded?: BasicComicIssue['isFullyUploaded']
	supply?: BasicComicIssue['supply']
	discountMintPrice?: BasicComicIssue['discountMintPrice']
	mintPrice?: BasicComicIssue['mintPrice']
	sellerFeeBasisPoints?: BasicComicIssue['sellerFee']
	creatorAddress?: BasicComicIssue['creatorAddress']
	creatorBackupAddress?: string
	collaborators?: ComicIssueCollaborator[]
	royaltyWallets?: RoyaltyWallet[]
	releaseDate: Date
}

export type UpdateComicIssueData = Partial<
	Pick<
		CreateComicIssueData,
		| 'number'
		| 'supply'
		| 'discountMintPrice'
		| 'mintPrice'
		| 'sellerFeeBasisPoints'
		| 'description'
		| 'flavorText'
		| 'releaseDate'
		| 'creatorAddress'
		| 'creatorBackupAddress'
		| 'collaborators'
		| 'royaltyWallets'
	>
>

export type UpdateComicIssueFilesData = Partial<{
	signature: File
	pdf: File
}>
