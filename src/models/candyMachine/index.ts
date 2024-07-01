import { CandyMachineGroupWithSource } from './candyMachineGroup'

export interface CandyMachine {
  address: string
  supply: number
  discount: number
  itemsMinted: number
  groups: CandyMachineGroupWithSource[]
}
