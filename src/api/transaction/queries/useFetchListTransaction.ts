import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { ListParams } from '@/models/transaction/list'
import { decodeTransaction } from '@/utils/general'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, LIST } = TRANSACTION_QUERY_KEYS

const fetchListTransaction = async (params: ListParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${LIST}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchListTransaction = (params: ListParams) => {
  return useQuery({
    queryFn: () => fetchListTransaction(params),
    queryKey: transactionKeys.list(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
