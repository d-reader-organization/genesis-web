import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { decodeTransaction } from '@/utils/transactions'
import { Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, USE_COMIC_ISSUE_ASSET } = TRANSACTION_QUERY_KEYS

const fetchUseComicIssueAssetTransaction = async (params: UseComicIssueAssetParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({ path: `${TRANSACTION}/${USE_COMIC_ISSUE_ASSET}`, params })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const useFetchUseComicIssueAssetTransaction = (params: UseComicIssueAssetParams, enabled = true) => {
  return useQuery({
    queryFn: () => fetchUseComicIssueAssetTransaction(params),
    queryKey: transactionKeys.useComicIssueAsset(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes,
    enabled,
    throwOnError: onQueryError,
  })
}
