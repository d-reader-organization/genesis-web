import { CreatorStats } from './creatorStats'
import { CreatorMyStats } from './creatorMyStats'

export interface BasicCreator {
	id: number
	email: string
	name: string
	slug: string
	isVerified: boolean
	avatar: string
	banner: string
	logo: string
	description: string
	flavorText: string
	tippingAddress: string
	website: string
	twitter: string
	instagram: string
	lynkfire: string
}

export interface Creator extends BasicCreator {
	stats: CreatorStats
	myStats: CreatorMyStats
}

export type UpdateCreatorData = Partial<
	Pick<
		Creator,
		'email' | 'description' | 'flavorText' | 'tippingAddress' | 'website' | 'twitter' | 'instagram' | 'lynkfire'
	>
>

export type UpdateCreatorFilesData = Partial<{
	avatar: File
	banner: File
	logo: File
}>
