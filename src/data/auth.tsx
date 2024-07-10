import { accessTokenCookieKey } from '@/constants/general'
import { cookies } from 'next/headers'

export const isAuthorized = () => {
  const token = cookies().get(accessTokenCookieKey)?.value ?? ''
  // TODO validate token
  return !!token.length
}
