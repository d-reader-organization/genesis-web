import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { SignComicParams } from '@/models/transaction/signComic'
import { decodeTransaction } from '@/utils/general'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, SIGN_COMIC } = TRANSACTION_QUERY_KEYS

const fetchSignComicTransaction = async (params: SignComicParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${SIGN_COMIC}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchSignComicTransaction = (params: SignComicParams) => {
  return useQuery({
    queryFn: () => fetchSignComicTransaction(params),
    queryKey: transactionKeys.signComic(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
