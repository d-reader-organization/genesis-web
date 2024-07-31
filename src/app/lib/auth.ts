import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'
import { decodeJwt } from 'jose'

export const isAuthenticatedUser = (): boolean => {
  const token = cookies().get(accessTokenKey)?.value ?? ''
  try {
    decodeJwt(token)
    return !!token
  } catch (error) {
    return false
  }
}
