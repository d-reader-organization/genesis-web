import { useState, useEffect } from 'react'

const formatTime = (secs: number, expirationDate?: number) => {
	if (!expirationDate) return { seconds: 0, minutes: 0, hours: 0, days: 0, isDue: false, countdownString: '--' }

	const totalSeconds = Math.ceil(secs)

	const days = Math.floor((totalSeconds % (60 * 60 * 24 * 1000)) / (60 * 60 * 24))
	const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
	const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
	const seconds = Math.floor(totalSeconds % 60)

	let countdownString = ''
	if (totalSeconds > 0) {
		if (days) {
			countdownString += `${days}d ${hours}h ${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
		} else if (hours) {
			countdownString += `${hours}h ${minutes}m ${`${seconds}`.padStart(2, '0')}s`
		} else if (minutes || seconds) {
			countdownString += `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
		}
	}

	return { seconds, minutes, hours, days, isDue: totalSeconds === 0, countdownString }
}

const calculateRemaningSeconds = (expirationDate?: number) => {
	if (!expirationDate) return 0
	const now = new Date().getTime()
	const milliSecondsDistance = new Date(expirationDate).getTime() - now
	if (milliSecondsDistance > 0) return milliSecondsDistance / 1000
	return 0
}

type CountdownHook = (props: { expirationDate?: number; onExpire?: VoidFunction }) => {
	seconds: number
	minutes: number
	hours: number
	days: number
	countdownString: string
	isDue: boolean
}

export const useCountdownWithUnits: CountdownHook = ({ expirationDate, onExpire }) => {
	const [remainingSeconds, setRemainingSeconds] = useState(0)
	const [isCounting, setIsCounting] = useState(false)

	useEffect(() => {
		setRemainingSeconds(calculateRemaningSeconds(expirationDate))
		setIsCounting(calculateRemaningSeconds(expirationDate) > 0)
	}, [expirationDate])

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isCounting && remainingSeconds === 0) {
				if (onExpire) onExpire()
				setIsCounting(false)
			}
			setRemainingSeconds(calculateRemaningSeconds(expirationDate))
		}, 1000)

		if (!isCounting) clearInterval(interval)

		return () => clearInterval(interval)
	}, [onExpire, isCounting, remainingSeconds, expirationDate])

	return formatTime(remainingSeconds, expirationDate)
}

export default useCountdownWithUnits
