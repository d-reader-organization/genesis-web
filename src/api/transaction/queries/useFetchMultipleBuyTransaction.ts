import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { MultipleBuyParams } from '@/models/transaction/multipleBuy'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, MULTIPLE_BUY } = TRANSACTION_QUERY_KEYS

const fetchMultipleBuyTransaction = async (params: MultipleBuyParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${MULTIPLE_BUY}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchMultipleBuyTransaction = (params: MultipleBuyParams) => {
  return useQuery({
    queryFn: () => fetchMultipleBuyTransaction(params),
    queryKey: transactionKeys.multipleBuy(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
