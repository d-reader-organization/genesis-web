import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { PrivateBidParams } from '@/models/transaction/privateBid'
import { decodeTransaction } from '@/utils/general'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, PRIVATE_BID } = TRANSACTION_QUERY_KEYS

const fetchPrivateBidTransaction = async (params: PrivateBidParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${PRIVATE_BID}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchPrivateBidTransaction = (params: PrivateBidParams) => {
  return useQuery({
    queryFn: () => fetchPrivateBidTransaction(params),
    queryKey: transactionKeys.privateBid(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
