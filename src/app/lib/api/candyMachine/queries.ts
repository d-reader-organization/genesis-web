'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { CANDY_MACHINE_QUERY_KEYS } from '@/api/candyMachine/candyMachineKeys'
import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { Nullable } from '@/models/common'

const { CANDY_MACHINE, GET } = CANDY_MACHINE_QUERY_KEYS

export const fetchCandyMachine = async (params: CandyMachineParams): Promise<Nullable<CandyMachine>> => {
  const response = await fetchWrapper<CandyMachine>({
    path: `${CANDY_MACHINE}/${GET}`,
    params,
    revalidateCacheInSeconds: 60,
  })
  return response.data
}
