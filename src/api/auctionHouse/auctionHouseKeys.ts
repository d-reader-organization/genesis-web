import { ListedItemsParams } from '@/models/auctionHouse/listedItemParams'

export const AUCTION_HOUSE_QUERY_KEYS = Object.freeze({
	AUCTION_HOUSE: 'auction-house',
	GET: 'get',
	LISTED_ITEMS: 'listed-items',
	COLLECTION_STATS: 'collection-stats',
})

export const auctionHouseKeys = Object.freeze({
	getListedItems: (params: ListedItemsParams) => [
		AUCTION_HOUSE_QUERY_KEYS.AUCTION_HOUSE,
		AUCTION_HOUSE_QUERY_KEYS.GET,
		AUCTION_HOUSE_QUERY_KEYS.LISTED_ITEMS,
		params.isSold,
		params.skip,
		params.take,
		params.comicIssueId,
	],
	getCollectionStats: (comicIssueId: string | number) => [
		AUCTION_HOUSE_QUERY_KEYS.AUCTION_HOUSE,
		AUCTION_HOUSE_QUERY_KEYS.GET,
		AUCTION_HOUSE_QUERY_KEYS.COLLECTION_STATS,
		comicIssueId,
	],
})
