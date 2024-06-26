import { useRef, useEffect } from 'react'

export function usePreviousValue(value = '') {
	const prevValue = useRef(value)

	useEffect(() => {
		prevValue.current = value
	})

	return prevValue.current
}
