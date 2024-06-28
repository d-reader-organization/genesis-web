import { useCallback, useEffect } from 'react'
import { useConnectUserWallet, useRequestWalletPassword } from '@/api/auth'
import { useFetchMe, useFetchUserWallets } from '@/api/user'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    solana?: any
  }
}

type AuthorizeWalletHook = (callback?: VoidFunction) => void

export const useAuthorizeWallet: AuthorizeWalletHook = (callback) => {
  const { wallet, publicKey, signMessage, signTransaction } = useWallet()
  const { connection } = useConnection()

  const { data: me } = useFetchMe()
  const { data: connectedWallets = [], isLoading, isFetched } = useFetchUserWallets(me?.id || 0)

  const { mutateAsync: requestWalletPassword } = useRequestWalletPassword()
  const { mutateAsync: connectUserWallet } = useConnectUserWallet()

  // const solanaKey = window.solana?.publicKey
  const walletAddress = publicKey?.toBase58()
  const connectedWalletAddresses = connectedWallets.map((wallet) => wallet.address)
  const hasWalletConnected = !!walletAddress && connectedWalletAddresses.includes(walletAddress)

  const authorizeWallet = useCallback(async () => {
    if (!publicKey || !isFetched || isLoading || hasWalletConnected) return

    const address = publicKey.toBase58()
    const otp = await requestWalletPassword(address)
    const message = new TextEncoder().encode(otp)

    let encoding = ''
    // If wallet supports message signing, go with that option
    if (signMessage && wallet?.adapter.name !== 'Ledger') {
      const signedMessage = await signMessage(message)
      encoding = bs58.encode(signedMessage)
    }
    // Otherwise sign a transaction with OTP stored in its instruction
    else if (signTransaction) {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

      const transaction = new Transaction({ feePayer: publicKey, blockhash, lastValidBlockHeight }).add({
        keys: [],
        programId: PublicKey.default,
        data: Buffer.from(message),
      })

      const signedTransaction = await signTransaction(transaction)
      encoding = bs58.encode(signedTransaction.serialize())
    } else throw new Error('Wallet does not support message or transaction signing!')

    await connectUserWallet({ address, encoding })
    if (typeof callback === 'function') callback()
  }, [
    publicKey,
    isFetched,
    isLoading,
    hasWalletConnected,
    requestWalletPassword,
    signMessage,
    wallet?.adapter.name,
    signTransaction,
    connectUserWallet,
    connection,
    callback,
  ])

  useEffect(() => {
    authorizeWallet()
  }, [authorizeWallet])
}

export default useAuthorizeWallet
