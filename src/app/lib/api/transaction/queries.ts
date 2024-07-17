'use server'

import { TRANSACTION_QUERY_KEYS } from '@/api/transaction/transactionKeys'
import { MintOneParams } from '@/models/transaction/mintOne'
import { fetchWrapper } from '../../fetchWrapper'

const { TRANSACTION, MINT_ONE } = TRANSACTION_QUERY_KEYS

export const fetchMintOneTransaction = async (params: MintOneParams): Promise<string[]> => {
  const response = await fetchWrapper<string[]>({
    path: `${TRANSACTION}/${MINT_ONE}`,
    params,
  })
  return JSON.parse(JSON.stringify(response.data ?? []))
}
