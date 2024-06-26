import { USER_QUERY_KEYS, userKeys } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { User, UpdateUserData } from '@/models/user'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, UPDATE } = USER_QUERY_KEYS

const updateUser = async (id: string | number, request: UpdateUserData): Promise<User> => {
	const response = await http.patch<User>(`${USER}/${UPDATE}/${id}`, request)
	return response.data
}

export const useUpdateUser = (id: string | number) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updateData: UpdateUserData) => updateUser(id, updateData),
		onSuccess: () => {
			toaster.add('Account updated!', 'success')
			queryClient.invalidateQueries(userKeys.getMe)
			queryClient.invalidateQueries(userKeys.get(id))
		},
		onError: toaster.onQueryError,
	})
}
