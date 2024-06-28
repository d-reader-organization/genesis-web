import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { Authorization } from '@/models/auth'
import { RegisterData } from '@/models/auth/register'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, CREATOR, REGISTER } = AUTH_QUERY_KEYS

const register = async (request: RegisterData): Promise<Authorization> => {
  const response = await http.post<Authorization>(`${AUTH}/${CREATOR}/${REGISTER}`, request)
  return response.data
}

export const useRegisterCreator = () => {
  const { addAuthorization } = useCreatorAuth()
  const toaster = useToaster()

  return useMutation({
    mutationFn: (request: RegisterData) => register(request),
    onSuccess: (data) => {
      const creator = addAuthorization(data)
      toaster.add(`Welcome ${creator.name}! 🎉`, 'success')
    },
    onError: toaster.onQueryError,
  })
}
