import { SortOrder } from '@/utils/enums'
import { Pagination } from '@/models/pagination'

export enum ComicFilterTag {
  Popular = 'popular',
}

export enum ComicSortTag {
  Title = 'title',
  Rating = 'rating',
  Likes = 'likes',
  Readers = 'readers',
  Viewers = 'viewers',
  Published = 'published',
}

export type ComicParams = Pagination & {
  creatorSlug?: string
  titleSubstring?: string
  genreSlugs?: string[]
  sortOrder?: SortOrder
  filterTag?: ComicFilterTag
  sortTag?: ComicSortTag
}

export type RawComicParams = Omit<ComicParams, 'filterTag'>
