import { assetKeys, ASSET_QUERY_KEYS } from '@/api/asset/assetKeys'
import { useToaster } from '@/providers/ToastProvider'
import { AssetParams } from '@/models/asset/assetParams'
import { Asset } from '@/models/asset'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { ASSET, GET } = ASSET_QUERY_KEYS

const fetchAssets = async (params: AssetParams): Promise<Asset[]> => {
  const response = await http.get<Asset[]>(`${ASSET}/${GET}`, { params })
  return response.data
}

export const useFetchAssets = (params: AssetParams, enabled: boolean = true) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchAssets(params),
    queryKey: assetKeys.getMany(params),
    staleTime: 1000 * 60 * 30, // stale for 30 minutes,
    enabled,
    onError: toaster.onQueryError,
  })
}
