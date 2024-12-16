'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { CANDY_MACHINE_QUERY_KEYS } from '@/api/candyMachine/candyMachineKeys'
import { CandyMachine, LaunchpadModel } from '@/models/candyMachine'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { Nullable } from '@/models/common'
import { Pagination } from '@/models/pagination'

const { CANDY_MACHINE, GET, LAUNCHPADS } = CANDY_MACHINE_QUERY_KEYS

export const fetchCandyMachine = async (params: CandyMachineParams): Promise<Nullable<CandyMachine>> => {
  const response = await fetchWrapper<CandyMachine>({
    path: `${CANDY_MACHINE}/${GET}`,
    params,
  })
  return response.data
}

export const fetchLaunchpads = async (params: Pagination): Promise<LaunchpadModel[]> => {
  const response = await fetchWrapper<LaunchpadModel[]>({
    path: `${CANDY_MACHINE}/${GET}/${LAUNCHPADS}`,
    params,
  })
  return response.data ?? []
}
