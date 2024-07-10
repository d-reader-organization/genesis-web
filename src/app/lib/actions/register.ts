'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { fetchWrapper } from '../fetchWrapper'
import { googleAccessTokenKey, SUCC_RESPONSE_STATUS_CODES } from '@/constants/general'
import { generateMinLengthErrorMessage } from '@/utils/error'
import { AuthFormState } from '@/models/auth/'
import { parseAndSetCookie } from './login'

const { AUTH, USER, REGISTER, REGISTER_WITH_GOOGLE } = AUTH_QUERY_KEYS

const registerSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
  email: z.string().email(),
  password: z.string(),
})

const registerAction = async (prev: AuthFormState | null, formData: FormData): Promise<AuthFormState | null> => {
  const parsed = registerSchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    return { error: `Please provide valid data`, success: false }
  }

  try {
    const response = await fetchWrapper({
      body: parsed.data,
      method: 'POST',
      path: `${AUTH}/${USER}/${REGISTER}`,
    })

    if (!SUCC_RESPONSE_STATUS_CODES.includes(response.status)) {
      const error: { message: string } = await response.json()
      return { error: error.message, success: false }
    }
    await parseAndSetCookie(response)
    revalidatePath(RoutePath.Register)
  } catch (error) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

const registerWithGoogleSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
})

const registerWithGoogleAction = async (
  prev: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = registerWithGoogleSchema.safeParse({
    name: formData.get('name') ?? '',
  })

  if (!parsed.success) {
    return { error: `Please provide valid username`, success: false }
  }

  try {
    const response = await fetchWrapper({
      body: parsed.data,
      headers: {
        authorization: `Google ${cookies().get(googleAccessTokenKey)?.value}`,
      },
      method: 'POST',
      path: `${AUTH}/${USER}/${REGISTER_WITH_GOOGLE}`,
    })

    if (!SUCC_RESPONSE_STATUS_CODES.includes(response.status)) {
      const error: { message: string } = await response.json()
      return { error: error.message, success: false }
    }
    await parseAndSetCookie(response)
    cookies().delete(googleAccessTokenKey)
    revalidatePath(RoutePath.Register)
  } catch (error) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

export { registerAction, registerWithGoogleAction }
