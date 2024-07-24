import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { TipCreatorParams } from '@/models/transaction/tipCreator'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'

const { TRANSACTION, TIP_CREATOR } = TRANSACTION_QUERY_KEYS

const fetchTipCreatorTransaction = async (params: TipCreatorParams): Promise<Transaction> => {
  const response = await http.get<string>(`${TRANSACTION}/${TIP_CREATOR}`, { params })
  return decodeTransaction(response.data, 'base64')
}

export const useFetchTipCreatorTransaction = (params: TipCreatorParams) => {
  return useQuery({
    queryFn: () => fetchTipCreatorTransaction(params),
    queryKey: transactionKeys.tipCreator(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
