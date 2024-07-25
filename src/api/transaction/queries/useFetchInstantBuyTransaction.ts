import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { InstantBuyParams } from '@/models/transaction/instantBuy'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, INSTANT_BUY } = TRANSACTION_QUERY_KEYS

const fetchInstantBuyTransaction = async (params: InstantBuyParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${INSTANT_BUY}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchInstantBuyTransaction = (params: InstantBuyParams) => {
  return useQuery({
    queryFn: () => fetchInstantBuyTransaction(params),
    queryKey: transactionKeys.instantBuy(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
