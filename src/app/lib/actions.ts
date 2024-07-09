'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { fetchWrapper } from './fetchWrapper'

const { AUTH, USER, LOGIN } = AUTH_QUERY_KEYS

const SUCC_RESPONSE_STATUS_CODES = [200, 201]

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

const login = async (prev: string | null, formData: FormData): Promise<string | null> => {
  const parsed = loginSchema.safeParse({
    nameOrEmail: formData.get('nameOrEmail') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    return `Provide proper username or email and password`
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
  } catch (error) {
    return `error`
  }
  redirect(RoutePath.Home)
}

const parseAndSetCookie = async (response: Response): Promise<void> => {
  const tokens = (await response.json()) as Authorization
  const expiresDate = new Date(Date.now() + 10 * 1000)
  expiresDate.setTime(expiresDate.getTime() + 30 * 24 * 60 * 60)
  cookies().set('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresDate,
  })
  revalidatePath(RoutePath.Login)
}

const register = async (): Promise<boolean> => {
  return true
}

export { login, register }
