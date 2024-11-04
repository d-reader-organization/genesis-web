import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { CancelBidParams } from '@/models/transaction/cancelBid'
import { decodeTransaction } from '@/utils/general'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, CANCEL_BID } = TRANSACTION_QUERY_KEYS

const fetchCancelBidTransaction = async (params: CancelBidParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${CANCEL_BID}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchCancelBidTransaction = (params: CancelBidParams) => {
  return useQuery({
    queryFn: () => fetchCancelBidTransaction(params),
    queryKey: transactionKeys.cancelBid(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
