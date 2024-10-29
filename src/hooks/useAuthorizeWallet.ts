import { useCallback, useEffect } from 'react'
import { useConnectUserWallet, useRequestWalletPassword } from '@/api/auth'
import { useFetchMe, useFetchUserWallets, userKeys } from '@/api/user'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { useQueryClient } from '@tanstack/react-query'
import { LEDGER_ADAPTERS } from '@/constants/general'
import { MEMO_PROGRAM_ID } from '@/constants/programId'
import { SignedDataType } from '@/models/wallet/connectWallet'
import { toast } from '@/components/ui'

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
  const queryClient = useQueryClient()

  const walletAddress = publicKey?.toBase58()
  const connectedWalletAddresses = connectedWallets.map((wallet) => wallet.address)
  const hasWalletConnected = !!walletAddress && connectedWalletAddresses.includes(walletAddress)

  const authorizeWallet = useCallback(async () => {
    if (!publicKey || !isFetched || isLoading || hasWalletConnected || !wallet) return

    const address = publicKey.toBase58()
    const otp = await requestWalletPassword(address)
    const walletName = wallet.adapter.name

    let encoding = ''
    let type: SignedDataType
    if (
      signTransaction &&
      (walletName === LEDGER_ADAPTERS.PHANTOM.NAME || walletName === LEDGER_ADAPTERS.SOLFLARE.NAME)
    ) {
      // Use random keypair signing to avoid compute instruction added on default by wallets
      const keypair = Keypair.generate()

      const instruction = new TransactionInstruction({
        keys: [
          { isSigner: true, isWritable: false, pubkey: publicKey },
          { isSigner: true, isWritable: false, pubkey: keypair.publicKey },
          { isSigner: true, isWritable: false, pubkey: PublicKey.default },
        ],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from(otp, 'utf8'),
      })

      const latestBlockHash = await connection.getLatestBlockhash()
      const transaction = new Transaction({ feePayer: publicKey, ...latestBlockHash }).add(instruction)
      transaction.partialSign(keypair)

      const signedTransaction = await signTransaction(transaction)
      encoding = signedTransaction.serialize({ requireAllSignatures: false }).toString('base64')
      type = SignedDataType.Transaction
    } else if (signMessage) {
      const message = new TextEncoder().encode(otp)
      const signedMessage = await signMessage(message)
      encoding = bs58.encode(signedMessage)

      type = SignedDataType.Message
    } else {
      throw new Error('Wallet does not support message or transaction signing!')
    }

    const { errorMessage } = await connectUserWallet({ address, encoding, signedDataType: type })

    if (errorMessage) {
      toast({ description: `Error connecting wallet ! ${errorMessage}`, variant: 'error' })
      return
    }

    queryClient.invalidateQueries({ queryKey: userKeys.getWallets(me?.id || 0) })
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
