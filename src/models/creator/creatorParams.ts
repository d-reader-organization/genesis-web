import { SortOrder } from '@/enums/sortOrder'
import { Pagination } from '@/models/pagination'

export enum CreatorFilterTag {
  Popular = 'popular',
}

export enum CreatorSortTag {
  Followers = 'followers',
  Name = 'name',
}

export interface CreatorParams extends Pagination {
  nameSubstring?: string
  genreSlugs?: string[]
  sortOrder?: SortOrder
  filterTag?: CreatorFilterTag
  sortTag?: CreatorSortTag
}
