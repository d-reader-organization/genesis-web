import { Authorization } from '@/models/auth'
import { authOptions } from '@/utils/auth'
import NextAuth from 'next-auth'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		authTokens?: Authorization
		accessToken?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
