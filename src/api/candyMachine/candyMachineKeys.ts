import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'

export const CANDY_MACHINE_QUERY_KEYS = Object.freeze({
  CANDY_MACHINE: 'candy-machine',
  GET: 'get',
  ELIGIBLE_GROUPS: 'eligible-groups',
  GROUPS: 'groups',
})

export const candyMachineKeys = Object.freeze({
  get: (params: CandyMachineParams) => [
    CANDY_MACHINE_QUERY_KEYS.CANDY_MACHINE,
    CANDY_MACHINE_QUERY_KEYS.GET,
    params.candyMachineAddress,
    params.walletAddress,
  ],
})
