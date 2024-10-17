'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'
import { RequestEmailChangeParams } from '@/models/user/requestEmailChangeParams'
import { ResetPasswordData } from '@/models/auth/resetPassword'
import { UpdateUserData, User } from '@/models/user'
import { Nullable } from '@/models/common'
import { UpdatePasswordData } from '@/models/auth/updatePassword'

const {
  AVATAR,
  DELETE,
  USER,
  UPDATE,
  RESET_PASSWORD,
  REQUEST_PASSWORD_RESET,
  REQUEST_EMAIL_CHANGE,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
} = USER_QUERY_KEYS

export const requestUserPasswordReset = async (body: RequestPasswordResetParams): Promise<void> => {
  await fetchWrapper<void>({ method: 'PATCH', body, isTextResponse: true, path: `${USER}/${REQUEST_PASSWORD_RESET}` })
}

export const deleteUser = async (slug: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${USER}/${DELETE}/${slug}`, method: 'PATCH' })
}

export const requestUserEmailChange = async (data: RequestEmailChangeParams): Promise<void> => {
  await fetchWrapper<void>({ method: 'PATCH', path: `${USER}/${REQUEST_EMAIL_CHANGE}`, body: data })
}

export const resetUserPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  await fetchWrapper({
    path: `${USER}/${RESET_PASSWORD}`,
    isTextResponse: true,
    body: resetPasswordData,
    method: 'PATCH',
  })
}

export const updateUser = async (id: string | number, request: UpdateUserData): Promise<Nullable<User>> => {
  const response = await fetchWrapper<User>({ path: `${USER}/${UPDATE}/${id}`, body: request, method: 'PATCH' })
  return response.data
}

export const updateUserAvatar = async (id: string | number, request: FormData): Promise<Nullable<User>> => {
  const response = await fetchWrapper<User>({
    path: `${USER}/${UPDATE}/${id}/${AVATAR}`,
    body: request,
    method: 'PATCH',
  })
  return response.data
}

export const updateUserPassword = async (id: string | number, request: UpdatePasswordData): Promise<void> => {
  await fetchWrapper<void>({
    method: 'PATCH',
    path: `${USER}/${UPDATE_PASSWORD}/${id}`,
    body: request,
  })
}

export const verifyUserEmail = async (verificationToken: string): Promise<Nullable<User>> => {
  const response = await fetchWrapper<User>({ method: 'PATCH', path: `${USER}/${VERIFY_EMAIL}/${verificationToken}` })
  return response.data
}
