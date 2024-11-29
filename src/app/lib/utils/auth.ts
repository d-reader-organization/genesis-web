import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'
import { isTokenValid } from './jwt'

export const isAuthenticatedUser = (): boolean => {
  const token = cookies().get(accessTokenKey)?.value ?? ''
  return isTokenValid(token)
}
