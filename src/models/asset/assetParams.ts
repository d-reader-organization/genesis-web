import { Pagination } from '@/models/pagination'

export interface AssetParams extends Partial<Pagination> {
	ownerAddress?: string
	comicSlug?: string
	userId?: string | number
	comicIssueId?: string | number
}
