export const SETTINGS_QUERY_KEYS = Object.freeze({
  SETTINGS: 'settings',
  GET: 'get',
  SPL_TOKEN: 'spl-token',
})

export const settingsKeys = Object.freeze({
  getSupportedTokens: [SETTINGS_QUERY_KEYS.SPL_TOKEN, SETTINGS_QUERY_KEYS.GET],
})
