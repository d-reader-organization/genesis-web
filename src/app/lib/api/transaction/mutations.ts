'use server'

import { TRANSACTION_QUERY_KEYS } from '@/api/transaction'
import { fetchWrapper } from '../../fetchWrapper'

const { TRANSACTION,SEND_MINT_TRANSACTION } = TRANSACTION_QUERY_KEYS

export const sendMintTransaction = async (walletAddress:string,transactions:string[]): Promise<void> => {
	await fetchWrapper<void>({path:`${TRANSACTION}/${SEND_MINT_TRANSACTION}/${walletAddress}`, method:'POST', body: {transactions}})
}
