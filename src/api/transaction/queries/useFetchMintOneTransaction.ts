import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { MintOneParams } from '@/models/transaction/mintOne'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { VersionedTransaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'

const { TRANSACTION, MINT_ONE } = TRANSACTION_QUERY_KEYS

/** @deprecated */
const fetchMintOneTransaction = async (params: MintOneParams): Promise<VersionedTransaction[]> => {
  const response = await http.get<string[]>(`${TRANSACTION}/${MINT_ONE}`, { params })
  return response.data.map(versionedTransactionFromBs64)
}

export const useFetchMintOneTransaction = (params: MintOneParams, enabled?: boolean) => {
  return useQuery({
    queryFn: () => fetchMintOneTransaction(params),
    queryKey: transactionKeys.mintOne(params),
    staleTime: 1000 * 60, // stale for 60 seconds
    enabled: enabled && !!params.candyMachineAddress && !!params.minterAddress && !!params.label,
    throwOnError: onQueryError,
  })
}
