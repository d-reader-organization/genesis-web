import { candyMachineKeys, CANDY_MACHINE_QUERY_KEYS } from '@/api/candyMachine/candyMachineKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { CandyMachine } from '@/models/candyMachine'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { CANDY_MACHINE, GET } = CANDY_MACHINE_QUERY_KEYS

const fetchCandyMachine = async (params: CandyMachineParams): Promise<CandyMachine> => {
	const response = await http.get<CandyMachine>(`${CANDY_MACHINE}/${GET}`, { params })
	return response.data
}

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
