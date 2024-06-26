import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { COMIC_ISSUE_QUERY_KEYS, comicIssueKeys } from '@/api/comicIssue'
import { useFetchMe } from '@/api/user/queries/useFetchMe'
import { TRANSACTION_QUERY_KEYS } from '@/api/transaction'
import { comicKeys } from '@/api/comic'
import { isNil, isFinite, toNumber } from 'lodash'
import { ASSET_QUERY_KEYS } from '@/api/asset'
import http from '@/api/http'

const { AUTH, WALLET, CONNECT } = AUTH_QUERY_KEYS

type ConnectRequest = { address: string; encoding: string }

const connectUserWallet = async (address: string, encoding: string): Promise<void> => {
	const response = await http.patch<void>(`${AUTH}/${WALLET}/${CONNECT}/${address}/${encoding}`)
	return response.data
}

export const useConnectUserWallet = () => {
	const toaster = useToaster()
	const queryClient = useQueryClient()
	const { data: me } = useFetchMe()

	return useMutation({
		mutationFn: ({ address, encoding }: ConnectRequest) => connectUserWallet(address, encoding),
		onSuccess: () => {
			toaster.add('Wallet connected!', 'success')
			queryClient.invalidateQueries({
				predicate: (query) => {
					return (
						query.queryKey[0] === COMIC_ISSUE_QUERY_KEYS.COMIC_ISSUE &&
						query.queryKey[1] === COMIC_ISSUE_QUERY_KEYS.GET &&
						!isNil(query.queryKey[2]) &&
						isFinite(toNumber(query.queryKey[2]))
					)
				},
			})
			queryClient.invalidateQueries(comicIssueKeys.getByOwner(me?.id || 0))
			queryClient.invalidateQueries(comicKeys.getByOwner(me?.id || 0))
			queryClient.invalidateQueries([TRANSACTION_QUERY_KEYS.TRANSACTION])
			queryClient.invalidateQueries([ASSET_QUERY_KEYS.ASSET, ASSET_QUERY_KEYS.GET])
			queryClient.invalidateQueries({
				predicate: (query) => {
					return (
						query.queryKey[0] === USER_QUERY_KEYS.USER &&
						query.queryKey[1] === USER_QUERY_KEYS.GET &&
						query.queryKey[3] === USER_QUERY_KEYS.WALLETS
					)
				},
			})
		},
		onError: toaster.onQueryError,
	})
}
