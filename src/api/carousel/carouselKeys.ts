export const CAROUSEL_QUERY_KEYS = Object.freeze({
	CAROUSEL: 'carousel',
	SLIDES: 'slides',
	GET: 'get',
	CREATE: 'create',
	UPDATE: 'update',
	IMAGE: 'image',
	EXPIRE: 'expire',
})

export const carouselKeys = Object.freeze({
	getMany: [CAROUSEL_QUERY_KEYS.CAROUSEL, CAROUSEL_QUERY_KEYS.SLIDES, CAROUSEL_QUERY_KEYS.GET],
	get: (id: string | number) => [
		CAROUSEL_QUERY_KEYS.CAROUSEL,
		CAROUSEL_QUERY_KEYS.SLIDES,
		CAROUSEL_QUERY_KEYS.GET,
		`${id}`,
	],
})
