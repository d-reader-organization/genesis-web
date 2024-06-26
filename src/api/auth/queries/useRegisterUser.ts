import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { Authorization } from '@/models/auth'
import { GoogleRegisterData, RegisterData } from '@/models/auth/register'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, USER, REGISTER } = AUTH_QUERY_KEYS

const register = async (request: RegisterData): Promise<Authorization> => {
	const response = await http.post<Authorization>(`${AUTH}/${USER}/${REGISTER}`, request)
	return response.data
}

export const useRegisterUser = () => {
	const { addAuthorization } = useUserAuth()
	const toaster = useToaster()

	return useMutation({
		mutationFn: (request: RegisterData) => register(request),
		onSuccess: (data) => {
			const user = addAuthorization(data)
			toaster.add(`Welcome ${user.name}! 🎉`, 'success')
		},
		onError: toaster.onQueryError,
	})
}

const registerWithGoogle = async (request: GoogleRegisterData): Promise<Authorization> => {
	const response = await http.post<Authorization>(`${location.origin}/'@/api/${AUTH}/register-with-google`, request)
	return response.data
}

export const useRegisterGoogleUser = () => {
	const { addAuthorization } = useUserAuth()
	const toaster = useToaster()

	return useMutation({
		mutationFn: (request: GoogleRegisterData) => registerWithGoogle(request),
		onSuccess: (data) => {
			const user = addAuthorization(data)
			toaster.add(`Welcome ${user.name}! 🎉`, 'success')
		},
		onError: toaster.onQueryError,
	})
}
