import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { CancelListingParams } from '@/models/transaction/cancelListing'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, CANCEL_LISTING } = TRANSACTION_QUERY_KEYS

const fetchCancelListingTransaction = async (params: CancelListingParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${CANCEL_LISTING}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchCancelListingTransaction = (params: CancelListingParams) => {
  return useQuery({
    queryFn: () => fetchCancelListingTransaction(params),
    queryKey: transactionKeys.cancelListing(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
