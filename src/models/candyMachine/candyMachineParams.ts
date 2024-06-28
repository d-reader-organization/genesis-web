import { Pagination } from '@/models/pagination'

export interface CandyMachineReceiptParams extends Pagination {
  candyMachineAddress: string
}

export interface CandyMachineParams {
  candyMachineAddress: string
  walletAddress?: string
}
