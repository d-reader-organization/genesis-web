import { useEffect, useState } from 'react'

interface ScrollPosition {
	scrollX: number
	scrollY: number
}

const defaultScrollPosition: ScrollPosition = { scrollX: 0, scrollY: 0 }

type WindowScrollPositionsHook = () => ScrollPosition

export const useWindowScrollPositions: WindowScrollPositionsHook = () => {
	const [scrollPosition, setPosition] = useState(defaultScrollPosition)

	useEffect(() => {
		function updatePosition() {
			setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
		}

		window.addEventListener('scroll', updatePosition)
		updatePosition()

		return () => window.removeEventListener('scroll', updatePosition)
	}, [])

	return scrollPosition
}

export default useWindowScrollPositions
