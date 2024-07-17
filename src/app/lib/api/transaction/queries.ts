'use server'

import { TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { MintOneParams } from '@/models/transaction/mintOne'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { VersionedTransaction } from '@solana/web3.js'
import { fetchWrapper } from '../../fetchWrapper'

const { TRANSACTION, MINT_ONE } = TRANSACTION_QUERY_KEYS

export const fetchMintOneTransaction = async (params: MintOneParams): Promise<VersionedTransaction[]> => {
  const response = await fetchWrapper<string[]>({
    path: `${TRANSACTION}/${MINT_ONE}`,
    params,
  })
  return JSON.parse(JSON.stringify(response.data?.map(versionedTransactionFromBs64) ?? []))
}
