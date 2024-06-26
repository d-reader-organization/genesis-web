import { isEqual } from 'lodash'
import { useCallback, useMemo, useState } from 'react'

export type QueueHook<T> = {
	items: T[]
	add: (item: T) => void
	update: (item: T) => void
	remove: (item: T) => void
	clear: VoidFunction
	contains: (item: T) => boolean
	length: number
	isEmpty: boolean
}

type QueueOptions<T> = { size?: number; identity?: keyof T; initialState?: T[] }
const defaultOptions = { size: Infinity, initialState: [], identity: undefined }

export const useQueue = <T>(options: QueueOptions<T> = defaultOptions): QueueHook<T> => {
	const [items, setItems] = useState(options.initialState || [])
	const isEmpty = useMemo(() => items.length === 0, [items.length])
	const length = useMemo(() => items.length, [items.length])
	const { size = Infinity, identity } = options

	const equals = useCallback(
		(a: T, b: T) => {
			// If identity key is provided - use it
			if (identity) return a[identity] === b[identity]
			// otherwise deep compare
			else return isEqual(a, b)
		},
		[identity]
	)

	const contains = useCallback(
		(item: T) => {
			return items.findIndex((i) => equals(i, item)) !== -1
		},
		[equals, items]
	)

	const add = useCallback(
		(item: T) => {
			setItems((prevItems) => {
				// If item is already in the queue, remove it
				if (contains(item)) {
					return prevItems.filter((i) => !equals(i, item))
				}

				// If it's not, add it with respect the queue size
				if (prevItems.length === size) {
					// FIFO
					return [...prevItems.slice(1), item]
				} else return [...prevItems, item]
			})
		},
		[contains, equals, size]
	)

	const update = useCallback(
		(updatedItem: T) => {
			setItems((prevItems) => {
				return prevItems.map((i) => {
					if (equals(i, updatedItem)) return updatedItem
					else return i
				})
			})
		},
		[equals]
	)

	const remove = useCallback((item: T) => {
		setItems((prevItems) => prevItems.filter((i) => !isEqual(i, item)))
	}, [])

	const clear = useCallback(() => {
		setItems([])
	}, [])

	return { items, add, update, remove, clear, contains, length, isEmpty }
}

export default useQueue
