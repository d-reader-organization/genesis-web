/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import useCommittedRef from './useCommittedRef'

export default function useEventCallback<TCallback extends (...args: any[]) => any>(fn?: TCallback | null): TCallback {
	const ref = useCommittedRef(fn)
	return useCallback(
		function (...args: any[]) {
			return ref.current && ref.current(...args)
		},
		[ref]
	) as any
}
