export const SETTINGS_QUERY_KEYS = Object.freeze({
	SETTINGS: 'settings',
	GET: 'get',
	CREATE: 'create',
	UPDATE: 'update',
	GLOBAL_STATUS: 'global-status',
	SPL_TOKEN: 'spl-token',
})

export const settingsKeys = Object.freeze({
	getGlobalStatus: [SETTINGS_QUERY_KEYS.GLOBAL_STATUS, SETTINGS_QUERY_KEYS.GET],
	getSupportedTokens: [SETTINGS_QUERY_KEYS.SPL_TOKEN, SETTINGS_QUERY_KEYS.GET],
})
