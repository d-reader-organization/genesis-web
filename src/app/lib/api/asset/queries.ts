'use server'

import { ASSET_QUERY_KEYS } from '@/api/asset/assetKeys'
import { Asset } from '@/models/asset'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'

const { ASSET, GET } = ASSET_QUERY_KEYS

export const fetchAsset = async (address: string): Promise<Nullable<Asset>> => {
  const response = await fetchWrapper<Asset>({ path: `${ASSET}/${GET}/${address}` })
  return response.data
}
