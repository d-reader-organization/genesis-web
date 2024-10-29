export enum SignedDataType {
  Message = 'Message',
  Transaction = 'Transaction',
}

export interface ConnectWalletData {
  address: string
  encoding: string
  signedDataType: SignedDataType
}
