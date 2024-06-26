import { assetKeys, ASSET_QUERY_KEYS } from '@/api/asset/assetKeys'
import { useToaster } from '@/providers/ToastProvider'
import { Asset } from '@/models/asset'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { ASSET, GET } = ASSET_QUERY_KEYS

const fetchAsset = async (address: string): Promise<Asset> => {
	const response = await http.get<Asset>(`${ASSET}/${GET}/${address}`)
	return response.data
}

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
