import { Transaction, VersionedTransaction } from '@solana/web3.js'

export function decodeBs58(encodedString: string) {
	return new TextEncoder().encode(encodedString)
}

export function decodeBs64(encodedString: string) {
	return Buffer.from(encodedString, 'base64')
}

export function txFromBs58(encodedString: string) {
	return Transaction.from(decodeBs58(encodedString))
}

export function txFromBs64(encodedString: string) {
	return Transaction.from(decodeBs64(encodedString))
}

export function versionedTransactionFromBs58(encodedString: string) {
	return VersionedTransaction.deserialize(decodeBs58(encodedString))
}

export function versionedTransactionFromBs64(encodedString: string) {
	return VersionedTransaction.deserialize(decodeBs64(encodedString))
}

export type SupportedEncoding = 'base58' | 'base64'
export const decodeTransaction = (encodedTransaction: string, encoding: SupportedEncoding = 'base64') => {
	if (encoding === 'base58') {
		return txFromBs58(encodedTransaction)
	} else if (encoding === 'base64') {
		return txFromBs64(encodedTransaction)
	} else {
		throw new Error('Unsupported encoding format, base58 and base64 supported')
	}
}
