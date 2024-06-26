export const AUTH_QUERY_KEYS = Object.freeze({
	AUTH: 'auth',
	USER: 'user',
	CREATOR: 'creator',
	WALLET: 'wallet',
	REGISTER: 'register',
	LOGIN: 'login',
	VALIDATE_NAME: 'validate-name',
	VALIDATE_EMAIL: 'validate-email',
	REFRESH_TOKEN: 'refresh-token',
	REQUEST_PASSWORD: 'request-password',
	CONNECT: 'connect',
	DISCONNECT: 'disconnect',
})

export const userAuthKeys = Object.freeze({
	validateName: (name: string) => [AUTH_QUERY_KEYS.AUTH, AUTH_QUERY_KEYS.USER, AUTH_QUERY_KEYS.VALIDATE_NAME, name],
	validateEmail: (email: string) => [AUTH_QUERY_KEYS.AUTH, AUTH_QUERY_KEYS.USER, AUTH_QUERY_KEYS.VALIDATE_EMAIL, email],
})

export const creatorAuthKeys = Object.freeze({
	validateName: (name: string) => [AUTH_QUERY_KEYS.AUTH, AUTH_QUERY_KEYS.CREATOR, AUTH_QUERY_KEYS.VALIDATE_NAME, name],
	validateEmail: (email: string) => [
		AUTH_QUERY_KEYS.AUTH,
		AUTH_QUERY_KEYS.CREATOR,
		AUTH_QUERY_KEYS.VALIDATE_EMAIL,
		email,
	],
})
