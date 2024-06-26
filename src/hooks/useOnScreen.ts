import { debounce } from 'lodash'
import { useState, useMemo, useCallback } from 'react'

export const useOnScreen = <E extends HTMLElement>(): [boolean, boolean, React.RefCallback<E>] => {
	const [intersecting, setIntersecting] = useState(false)
	const [hasIntersected, setHasIntersected] = useState(false)

	const observer = useMemo(() => {
		const debouncedSetIntersecting = debounce((newValue: boolean) => {
			setIntersecting(newValue)
		}, 100)

		if (typeof window === 'object') {
			return new IntersectionObserver(([entry]) => {
				// https://stackoverflow.com/questions/53214116/intersectionobserver-callback-firing-immediately-on-page-load
				// if (entry.intersectionRatio >= 0) {
				// 	setIntersecting(true)
				// }

				debouncedSetIntersecting(entry.isIntersecting)
				if (entry.isIntersecting) setHasIntersected(true)
			})
		}
	}, [])

	const currentElement = useCallback(
		(element: E | null) => {
			if (!observer) return
			if (element) {
				setTimeout(() => {
					observer.observe(element)
				}, 1000)
			} else {
				// observer.disconnect()
				setIntersecting(false)
			}
		},
		[observer]
	)

	return [hasIntersected, intersecting, currentElement]
}

export default useOnScreen
