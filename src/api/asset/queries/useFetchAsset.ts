import { assetKeys } from '@/api/asset/assetKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import { fetchAsset } from '@/app/lib/api/asset/queries'

export const useFetchAsset = (address: string, enabled = true) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchAsset(address),
    queryKey: assetKeys.get(address),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour,
    enabled: enabled && !!address,
    onError: toaster.onQueryError,
  })
}
