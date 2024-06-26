import { CarouselLocation } from '@/enums/carouselLocation'

export interface CarouselSlide {
	id: number
	image: string
	priority: number
	title?: string
	subtitle?: string
	isPublished: boolean
	isExpired: boolean
	location: CarouselLocation
	comicIssueId?: number
	comicSlug?: string
	creatorSlug?: string
	externalLink?: string
}

export type CreateCarouselSlideData = Pick<
	CarouselSlide,
	| 'image'
	| 'priority'
	| 'title'
	| 'subtitle'
	| 'location'
	| 'comicIssueId'
	| 'comicSlug'
	| 'creatorSlug'
	| 'externalLink'
>

export type UpdateCarouselSlideData = Partial<
	Pick<
		CreateCarouselSlideData,
		'priority' | 'title' | 'subtitle' | 'location' | 'comicIssueId' | 'comicSlug' | 'creatorSlug' | 'externalLink'
	>
>
