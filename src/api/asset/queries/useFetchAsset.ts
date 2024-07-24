import { assetKeys } from '@/api/asset/assetKeys'
import { useQuery } from '@tanstack/react-query'
import { fetchAsset } from '@/app/lib/api/asset/queries'

export const useFetchAsset = (address: string, enabled = true) => {
  return useQuery({
    queryFn: () => fetchAsset(address),
    queryKey: assetKeys.get(address),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour,
    enabled: enabled && !!address,
  })
}
