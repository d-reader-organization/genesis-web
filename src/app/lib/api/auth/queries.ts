import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { baseApiUrl } from '@/constants/general'

const { AUTH, USER, REFRESH_TOKEN } = AUTH_QUERY_KEYS

export const refreshTokenCall = async (refreshToken: string): Promise<string> => {
  const response = await fetch(`${baseApiUrl}/${AUTH}/${USER}/${REFRESH_TOKEN}/${refreshToken}`, {
    method: 'PATCH',
  })
  return await response.text()
}
