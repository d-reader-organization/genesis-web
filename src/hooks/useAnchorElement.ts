import { useState } from 'react'

type AnchorElementHook = () => [HTMLElement | null, (event: React.MouseEvent<HTMLElement>) => void, VoidFunction]

export const useAnchorElement: AnchorElementHook = () => {
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

	const setAnchor = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget)
	}

	const resetAnchor = () => {
		setAnchorElement(null)
	}

	return [anchorElement, setAnchor, resetAnchor]
}

export default useAnchorElement
