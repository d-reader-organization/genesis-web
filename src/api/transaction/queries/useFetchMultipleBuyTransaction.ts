import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { useToaster } from '@/providers/ToastProvider'
import { MultipleBuyParams } from '@/models/transaction/multipleBuy'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { TRANSACTION, MULTIPLE_BUY } = TRANSACTION_QUERY_KEYS

const fetchMultipleBuyTransaction = async (params: MultipleBuyParams): Promise<Transaction> => {
  const response = await http.get<string>(`${TRANSACTION}/${MULTIPLE_BUY}`, { params })
  return decodeTransaction(response.data, 'base64')
}

export const useFetchMultipleBuyTransaction = (params: MultipleBuyParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchMultipleBuyTransaction(params),
    queryKey: transactionKeys.multipleBuy(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    onError: toaster.onQueryError,
  })
}
