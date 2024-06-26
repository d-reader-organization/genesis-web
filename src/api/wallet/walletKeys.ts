export const WALLET_QUERY_KEYS = Object.freeze({
	WALLET: 'wallet',
	GET: 'get',
	UPDATE: 'update',
	SYNC: 'sync',
	ASSETS: 'assets',
})

export const walletKeys = Object.freeze({
	getMany: [WALLET_QUERY_KEYS.WALLET, WALLET_QUERY_KEYS.GET],
	get: (address: string) => [WALLET_QUERY_KEYS.WALLET, WALLET_QUERY_KEYS.GET, address],
	getAssets: (address: string) => [WALLET_QUERY_KEYS.WALLET, WALLET_QUERY_KEYS.GET, address, WALLET_QUERY_KEYS.ASSETS],
	sync: (address: string) => [WALLET_QUERY_KEYS.WALLET, WALLET_QUERY_KEYS.SYNC, address],
})
