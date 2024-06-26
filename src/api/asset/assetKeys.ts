import { AssetParams } from '@/models/asset/assetParams'

export const ASSET_QUERY_KEYS = Object.freeze({
	ASSET: 'asset',
	GET: 'get',
})

export const assetKeys = Object.freeze({
	get: (address: string) => [ASSET_QUERY_KEYS.ASSET, ASSET_QUERY_KEYS.GET, address],
	getMany: (params: AssetParams) => [
		ASSET_QUERY_KEYS.ASSET,
		ASSET_QUERY_KEYS.GET,
		params.ownerAddress,
		params.comicSlug,
		params.userId,
		params.comicIssueId,
		params.skip,
		params.take,
	],
})
