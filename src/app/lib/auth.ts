import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'

// TODO - validate token
export const isAuthenticatedUser = () => !!(cookies().get(accessTokenKey)?.value ?? '')
