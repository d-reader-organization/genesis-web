'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { fetchWrapper } from './fetchWrapper'
import { accessTokenKey, googleAccessTokenKey } from '@/constants/general'
import { generateMinLengthErrorMessage } from '@/utils/error'
import { RegisterFormState } from '@/models/auth/register'

const { AUTH, USER, LOGIN, REGISTER, REGISTER_WITH_GOOGLE } = AUTH_QUERY_KEYS
const SUCC_RESPONSE_STATUS_CODES = [200, 201]

type NullableString = string | null

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

const login = async (prev: string | null, formData: FormData): Promise<NullableString> => {
  const parsed = loginSchema.safeParse({
    nameOrEmail: formData.get('nameOrEmail') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    return `Provide username or email and password`
  }

  try {
    const response = await fetchWrapper({
      body: parsed.data,
      method: 'PATCH',
      path: `${AUTH}/${USER}/${LOGIN}`,
    })

    if (!SUCC_RESPONSE_STATUS_CODES.includes(response.status)) {
      const error: { message: string } = await response.json()
      return error.message
    }
    await parseAndSetCookie(response)
    revalidatePath(RoutePath.Login)
  } catch (error) {
    return `Failed to login user`
  }
  redirect(RoutePath.Home)
}

// TODO encrypt and decrypt token from cookie
const parseAndSetCookie = async (response: Response): Promise<void> => {
  const tokens = (await response.json()) as Authorization
  const expiresDate = new Date(Date.now() + 10 * 1000)
  expiresDate.setTime(expiresDate.getTime() + 30 * 24 * 60 * 60)
  cookies().set(accessTokenKey, tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresDate,
  })
}

const registerSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
  email: z.string().email(),
  password: z.string(),
})

const register = async (prev: RegisterFormState | null, formData: FormData): Promise<RegisterFormState | null> => {
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

const registerWithGoogle = async (
  prev: RegisterFormState | null,
  formData: FormData
): Promise<RegisterFormState | null> => {
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

export { login, register, registerWithGoogle }
