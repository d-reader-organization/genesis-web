import { transactionKeys, TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { useToaster } from '@/providers/ToastProvider'
import { MintParams } from '@/models/transaction/mint'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { VersionedTransaction } from '@solana/web3.js'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { TRANSACTION, MINT } = TRANSACTION_QUERY_KEYS

// TODO: this is incorrect, should return array of arrays? update all transactions to match backend
const fetchMintTransaction = async (params: MintParams): Promise<VersionedTransaction[]> => {
  const response = await http.get<string[]>(`${TRANSACTION}/${MINT}`, { params })
  return response.data.map(versionedTransactionFromBs64)
}

export const useFetchMintTransaction = (params: MintParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchMintTransaction(params),
    queryKey: transactionKeys.mint(params),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    enabled: !!params.candyMachineAddress && !!params.minterAddress && !!params.label,
    onError: toaster.onQueryError,
  })
}
