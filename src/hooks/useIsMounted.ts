import { useCallback, useEffect, useRef } from 'react'

type IsMountedHook = () => boolean

export const useIsMounted = (): IsMountedHook => {
	const isMounted = useRef(false)

	useEffect(() => {
		isMounted.current = true

		return () => {
			isMounted.current = false
		}
	})

	return useCallback(() => {
		return isMounted.current
	}, [])
}

export default useIsMounted
