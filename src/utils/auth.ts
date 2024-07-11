import { accessTokenKey, googleAccessTokenKey } from '@/constants/general'
import { RoutePath } from '@/enums/routePath'
import { Authorization } from '@/models/auth'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    signIn: async ({ account }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login-with-google`, {
        method: 'PATCH',
        headers: {
          authorization: `Google ${account?.access_token}`,
        },
      })
      const parsed: Authorization | string = await response.json()
      if (typeof parsed === 'string') {
        cookies().set(googleAccessTokenKey, account?.access_token ?? '')
        return parsed
      }

      cookies().set(accessTokenKey, parsed.accessToken)
      return RoutePath.Home
    },
  },
} satisfies AuthOptions
