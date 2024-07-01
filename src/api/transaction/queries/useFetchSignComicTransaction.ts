import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { useToaster } from '@/providers/ToastProvider'
import { SignComicParams } from '@/models/transaction/signComic'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { TRANSACTION, SIGN_COMIC } = TRANSACTION_QUERY_KEYS

const fetchSignComicTransaction = async (params: SignComicParams): Promise<Transaction> => {
  const response = await http.get<string>(`${TRANSACTION}/${SIGN_COMIC}`, { params })
  return decodeTransaction(response.data, 'base64')
}

export const useFetchSignComicTransaction = (params: SignComicParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchSignComicTransaction(params),
    queryKey: transactionKeys.signComic(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    onError: toaster.onQueryError,
  })
}
