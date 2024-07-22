'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { AuthFormState, Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchWrapper } from '../fetchWrapper'
import { accessTokenKey, jwtCookieProps, refreshTokenKey } from '@/constants/general'
import { loginSchema } from '@/constants/schemas'

const { AUTH, USER, LOGIN } = AUTH_QUERY_KEYS

export const loginAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
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
    const response = await fetchWrapper<Authorization>({
      body: parsed.data,
      method: 'PATCH',
      path: `${AUTH}/${USER}/${LOGIN}`,
    })

    if (response.errorMessage) {
      return {
        error: response.errorMessage,
        success: false,
      }
    }

    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    parseAndSetCookieAfterAuth(response.data)
    revalidatePath(RoutePath.Login)
  } catch (error) {
    return {
      error: `Failed to login user`,
      success: false,
    }
  }

  redirect(redirectTo ?? RoutePath.Home)
}

export const parseAndSetCookieAfterAuth = (data: Authorization): void => {
  const { accessToken, refreshToken } = data
  setCookie({
    name: accessTokenKey,
    value: accessToken,
  })
  setCookie({
    name: refreshTokenKey,
    value: refreshToken,
  })
}

export const setCookie = ({ name, value }: { name: string; value: string }) => {
  cookies().set(name, value, jwtCookieProps)
}
