import { assetKeys } from '@/api/asset/assetKeys'
import { AssetParams } from '@/models/asset/assetParams'
import { useQuery } from '@tanstack/react-query'
import { fetchAssets } from '@/app/lib/api/asset/queries'

export const useFetchAssets = (params: AssetParams, enabled: boolean = true) => {
  return useQuery({
    queryFn: () => fetchAssets(params),
    queryKey: assetKeys.getMany(params),
    staleTime: 1000 * 60 * 30, // stale for 30 minutes,
    enabled,
  })
}
