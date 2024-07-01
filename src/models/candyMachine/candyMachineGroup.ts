export interface CandyMachineGroup {
  label: string
  startDate: string
  endDate: string
  displayLabel: string
  splTokenAddress: string
  mintPrice: number
  itemsMinted: number
  mintLimit: number
  discount: number
  supply: number
  isActive: boolean
  whiteListType: WhiteListType
}

export enum WhiteListType {
  User = 'User',
  Public = 'Public',
  UserWhiteList = 'UserWhiteList',
  WalletWhiteList = 'WalletWhiteList',
}

export interface CandyMachineGroupWallet {
  isEligible: boolean
  itemsMinted?: number
  supply?: number
}

export interface CandyMachineGroupUser {
  isEligible: boolean
  itemsMinted?: number
  supply?: number
}

export interface CandyMachineGroupWithSource extends CandyMachineGroup {
  wallet: CandyMachineGroupWallet
  user: CandyMachineGroupUser
}
