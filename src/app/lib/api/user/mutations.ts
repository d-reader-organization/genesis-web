'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'

const { USER, REQUEST_PASSWORD_RESET } = USER_QUERY_KEYS

export const requestUserPasswordReset = async (params: RequestPasswordResetParams): Promise<void> => {
  await fetchWrapper<void>({ method: 'PATCH', params, path: `${USER}/${REQUEST_PASSWORD_RESET}` })
}
