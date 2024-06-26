import { ForwardedRef, MutableRefObject } from 'react'

export const mergeRefs = <T>(...refs: (MutableRefObject<T | null> | ForwardedRef<T | null> | null)[]) => {
	return (node: T | null) => {
		for (const ref of refs) {
			if (ref && typeof ref === 'object') ref.current = node
		}
	}
}
