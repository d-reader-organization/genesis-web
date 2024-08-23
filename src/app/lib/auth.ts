import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'
import { decodeJwt } from 'jose'

export const isAuthenticatedUser = (): boolean => {
  const token = cookies().get(accessTokenKey)?.value ?? ''
  try {
    const decoded = decodeJwt(token)
    const currentTime = Date.now() / 1000
    return !!decoded.exp && decoded.exp >= currentTime
  } catch (error) {
    return false
  }
}
