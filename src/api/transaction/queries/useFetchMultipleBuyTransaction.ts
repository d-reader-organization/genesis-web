import { transactionKeys } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { MultipleBuyParams } from '@/models/transaction/multipleBuy'
import { useQuery } from '@tanstack/react-query'
import { fetchMultipleBuyTransaction } from '@/app/lib/api/transaction/queries'

export const useFetchMultipleBuyTransaction = (params: MultipleBuyParams) => {
  return useQuery({
    queryFn: () => fetchMultipleBuyTransaction(params),
    queryKey: transactionKeys.multipleBuy(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    throwOnError: onQueryError,
  })
}
