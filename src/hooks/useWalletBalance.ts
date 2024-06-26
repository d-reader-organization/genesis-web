import { useCallback, useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import useCancelablePromise from './useCancelablePromise'

type WalletBalanceHook = () => [number, () => Promise<void>]

export const useWalletBalance: WalletBalanceHook = () => {
	const { connection } = useConnection()
	const wallet = useWallet()
	const { publicKey } = wallet
	const [balance, setBalance] = useState(0)
	const makeCancelable = useCancelablePromise()

	const fetchBalance = useCallback(async () => {
		if (!publicKey) setBalance(0)
		else {
			try {
				const lamportBalance = await connection.getBalance(publicKey)
				setBalance(lamportBalance / LAMPORTS_PER_SOL)
			} catch {
				setBalance(0)
			}
		}
	}, [connection, publicKey])

	// Refetch balance whenever wallet or connection change
	useEffect(() => {
		makeCancelable(fetchBalance())
	}, [wallet, connection, makeCancelable, fetchBalance])

	return [balance, fetchBalance]
}

export default useWalletBalance
