import { transactionKeys } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { useQuery } from '@tanstack/react-query'
import { fetchUseComicIssueAssetTransaction } from '@/app/lib/api/transaction/queries'

export const useFetchUseComicIssueAssetTransaction = (params: UseComicIssueAssetParams, enabled = true) => {
  return useQuery({
    queryFn: () => fetchUseComicIssueAssetTransaction(params),
    queryKey: transactionKeys.useComicIssueAsset(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes,
    enabled,
    throwOnError: onQueryError,
  })
}
