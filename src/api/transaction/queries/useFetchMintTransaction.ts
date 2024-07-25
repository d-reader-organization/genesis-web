import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { MintParams } from '@/models/transaction/mint'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { VersionedTransaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { TRANSACTION, MINT } = TRANSACTION_QUERY_KEYS

// TODO: this is incorrect, should return array of arrays? update all transactions to match backend
const fetchMintTransaction = async (params: MintParams): Promise<VersionedTransaction[]> => {
  const response = await fetchWrapper<string[]>({ path: `${TRANSACTION}/${MINT}`, params })
  return response.data?.map(versionedTransactionFromBs64) ?? []
}

export const useFetchMintTransaction = (params: MintParams) => {
  return useQuery({
    queryFn: () => fetchMintTransaction(params),
    queryKey: transactionKeys.mint(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    enabled: !!params.candyMachineAddress && !!params.minterAddress && !!params.label,
    throwOnError: onQueryError,
  })
}
