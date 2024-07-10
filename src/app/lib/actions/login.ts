'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { AuthFormState, Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { fetchWrapper } from '../fetchWrapper'
import { accessTokenKey, SUCC_RESPONSE_STATUS_CODES } from '@/constants/general'

const { AUTH, USER, LOGIN } = AUTH_QUERY_KEYS

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

export const loginAction = async (prev: AuthFormState | null, formData: FormData): Promise<AuthFormState | null> => {
  const parsed = loginSchema.safeParse({
    nameOrEmail: formData.get('nameOrEmail') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    return {
      error: `Provide username or email and password`,
      success: false,
    }
  }

  try {
    const response = await fetchWrapper({
      body: parsed.data,
      method: 'PATCH',
      path: `${AUTH}/${USER}/${LOGIN}`,
    })

    if (!SUCC_RESPONSE_STATUS_CODES.includes(response.status)) {
      const error: { message: string } = await response.json()
      return {
        error: error.message,
        success: false,
      }
    }
    await parseAndSetCookie(response)
    revalidatePath(RoutePath.Login)
  } catch (error) {
    return {
      error: `Failed to login user`,
      success: false,
    }
  }

  redirect(RoutePath.Home)
}

// TODO encrypt and decrypt token from cookie
// TODO think what about expiry time
export const parseAndSetCookie = async (response: Response): Promise<void> => {
  const tokens = (await response.json()) as Authorization
  const expiresDate = new Date(Date.now() + 10 * 1000)
  expiresDate.setTime(expiresDate.getTime() + 30 * 24 * 60 * 60)
  cookies().set(accessTokenKey, tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresDate,
  })
}
