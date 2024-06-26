import { walletKeys, WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery, useQueryClient } from 'react-query'
import http from '@/api/http'

const { WALLET, SYNC } = WALLET_QUERY_KEYS

const syncWallet = async (address: string): Promise<void> => {
	const response = await http.get<void>(`${WALLET}/${SYNC}/${address}`)
	return response.data
}

export const useSyncWallet = (address: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useQuery({
		queryFn: () => syncWallet(address),
		queryKey: walletKeys.get(address),
		staleTime: Infinity, // never becomes stale
		onSuccess: () => {
			toaster.add('Wallet synced!', 'success')
			queryClient.invalidateQueries(walletKeys.getAssets(address))
		},
		onError: toaster.onQueryError,
	})
}
