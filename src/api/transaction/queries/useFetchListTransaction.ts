import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ListParams } from '@/models/transaction/list'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { TRANSACTION, LIST } = TRANSACTION_QUERY_KEYS

const fetchListTransaction = async (params: ListParams): Promise<Transaction> => {
	const response = await http.get<string>(`${TRANSACTION}/${LIST}`, { params })
	return decodeTransaction(response.data, 'base64')
}

export const useFetchListTransaction = (params: ListParams) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchListTransaction(params),
		queryKey: transactionKeys.list(params),
		staleTime: 1000 * 60 * 10, // stale for 10 minutes
		onError: toaster.onQueryError,
	})
}
