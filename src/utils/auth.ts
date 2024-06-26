import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
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
		jwt: async ({ account, token }) => {
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
		session: async ({ session, token }) => {
			if (!token.accessToken) {
				return session
			}
			session.accessToken = token.accessToken

			return session
		},
	},
} satisfies AuthOptions
