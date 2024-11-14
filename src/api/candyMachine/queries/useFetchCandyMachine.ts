import { candyMachineKeys } from '@/api/candyMachine/candyMachineKeys'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { useQuery } from '@tanstack/react-query'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { onQueryError } from '@/components/ui'

export const useFetchCandyMachine = (params: CandyMachineParams) => {
  return useQuery({
    queryFn: () => fetchCandyMachine(params),
    queryKey: candyMachineKeys.get(params),
    staleTime: 1000 * 60, // stale for 10 seconds
    enabled: !!params.candyMachineAddress,
    throwOnError: onQueryError,
  })
}
