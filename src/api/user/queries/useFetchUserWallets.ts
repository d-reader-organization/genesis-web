import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import { Wallet } from '@/models/wallet'
import http from '@/api/http'
import { isNil } from 'lodash'

const { USER, GET, WALLETS } = USER_QUERY_KEYS

const fetchUserWallets = async (id: string | number): Promise<Wallet[]> => {
	const response = await http.get<Wallet[]>(`${USER}/${GET}/${id}/${WALLETS}`)
	return response.data
}

export const useFetchUserWallets = (id: string | number) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchUserWallets(id),
		queryKey: userKeys.getWallets(id),
		staleTime: 1000 * 60 * 5, // stale for 5 minutes
		enabled: !isNil(id) && id !== 0,
		onError: toaster.onQueryError,
	})
}
