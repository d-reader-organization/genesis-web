import { PrefetchOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type ToggleHook = (href: string | string[], options?: PrefetchOptions) => void

export const usePrefetchRoute: ToggleHook = (href, options) => {
	const router = useRouter()

	useEffect(() => {
		if (Array.isArray(href)) {
			href.map((h) => {
				router.prefetch(h, options)
			})
		} else {
			router.prefetch(href, options)
		}
	}, [href, options, router])
}

export default usePrefetchRoute
