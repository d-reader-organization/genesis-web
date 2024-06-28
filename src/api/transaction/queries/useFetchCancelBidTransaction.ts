import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CancelBidParams } from '@/models/transaction/cancelBid'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { TRANSACTION, CANCEL_BID } = TRANSACTION_QUERY_KEYS

const fetchCancelBidTransaction = async (params: CancelBidParams): Promise<Transaction> => {
  const response = await http.get<string>(`${TRANSACTION}/${CANCEL_BID}`, { params })
  return decodeTransaction(response.data, 'base64')
}

export const useFetchCancelBidTransaction = (params: CancelBidParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchCancelBidTransaction(params),
    queryKey: transactionKeys.cancelBid(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    onError: toaster.onQueryError,
  })
}
