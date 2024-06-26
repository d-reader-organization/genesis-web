export const APP_QUERY_KEYS = Object.freeze({
	APP: 'app',
	HELLO: 'hello',
	HELLO_AUTHENTICATED_USER: 'hello-authenticated-user',
	HELLO_AUTHENTICATED_CREATOR: 'hello-authenticated-creator',
	HEALTHCHECK: 'healthcheck',
})

export const appKeys = Object.freeze({
	app: [APP_QUERY_KEYS.APP],
	hello: [APP_QUERY_KEYS.APP, APP_QUERY_KEYS.HELLO],
	helloAuthenticatedUser: [APP_QUERY_KEYS.APP, APP_QUERY_KEYS.HELLO],
	helloAuthenticatedCreator: [APP_QUERY_KEYS.APP, APP_QUERY_KEYS.HELLO],
	healthcheck: [APP_QUERY_KEYS.APP, APP_QUERY_KEYS.HELLO],
})
