import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'

export const isAuthorized = () => {
  const token = cookies().get(accessTokenKey)?.value ?? ''
  // TODO validate token
  return !!token.length
}
