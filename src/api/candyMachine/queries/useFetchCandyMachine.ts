import { candyMachineKeys } from '@/api/candyMachine/candyMachineKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { useQuery } from 'react-query'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'

export const useFetchCandyMachine = (params: CandyMachineParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchCandyMachine(params),
    queryKey: candyMachineKeys.get(params),
    staleTime: 1000 * 10, // stale for 10 seconds
    enabled: !!params.candyMachineAddress,
    onError: toaster.onQueryError,
  })
}
