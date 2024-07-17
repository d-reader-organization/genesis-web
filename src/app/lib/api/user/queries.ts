'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { User } from '@/models/user'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { isAuthenticatedUser } from '../../auth'

const { USER, GET, ME } = USER_QUERY_KEYS

export const fetchMe = async (): Promise<Nullable<User>> => {
  if (!isAuthenticatedUser()) {
    return null
  }
  const response = await fetchWrapper<User>({ path: `${USER}/${GET}/${ME}` })
  return response.data
}
