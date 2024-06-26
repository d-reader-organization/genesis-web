import { Pagination } from '@/models/pagination'

export interface ListedItemsParams extends Pagination {
	isSold: boolean
	comicIssueId: number
}
