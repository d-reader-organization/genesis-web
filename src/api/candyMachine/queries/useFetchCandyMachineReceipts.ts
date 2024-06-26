import { candyMachineKeys, CANDY_MACHINE_QUERY_KEYS } from '@/api/candyMachine/candyMachineKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CandyMachineReceipt } from '@/models/candyMachine/candyMachineReceipt'
import { CandyMachineReceiptParams } from '@/models/candyMachine/candyMachineParams'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { CANDY_MACHINE, GET, RECEIPTS } = CANDY_MACHINE_QUERY_KEYS

const fetchCandyMachineReceipts = async (params: CandyMachineReceiptParams): Promise<CandyMachineReceipt[]> => {
	const response = await http.get<CandyMachineReceipt[]>(`${CANDY_MACHINE}/${GET}/${RECEIPTS}`, { params })
	return response.data
}

export const useFetchCandyMachineReceipts = (params: CandyMachineReceiptParams) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchCandyMachineReceipts(params),
		queryKey: candyMachineKeys.getReceipts(params),
		staleTime: 1000 * 60 * 5, // stale for 5 minutes
		enabled: !!params.candyMachineAddress,
		onError: toaster.onQueryError,
	})
}
