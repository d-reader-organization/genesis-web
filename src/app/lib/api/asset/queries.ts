'use server'

import { ASSET_QUERY_KEYS } from '@/api/asset/assetKeys'
import { Asset } from '@/models/asset'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { AssetParams } from '@/models/asset/assetParams'

const { ASSET, GET } = ASSET_QUERY_KEYS

export const fetchAsset = async (address: string): Promise<Nullable<Asset>> => {
  const response = await fetchWrapper<Asset>({ path: `${ASSET}/${GET}/${address}` })
  return response.data
}

export const fetchAssets = async (params: AssetParams): Promise<Asset[]> => {
  const response = await fetchWrapper<Asset[]>({
    path: `${ASSET}/${GET}`,
    params,
    revalidateCacheInSeconds: 5,
  })
  return response.data ?? []
}
