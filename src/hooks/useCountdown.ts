import { calculateRemaningSeconds, formatTime } from '@/utils/time'
import { useState, useEffect } from 'react'

type CountdownHook = (props: { expirationDate?: string; onExpire?: VoidFunction }) => {
  seconds: number
  minutes: number
  hours: number
  days: number
  countdownString: string
  isDue: boolean
}

export const useCountdown: CountdownHook = ({ expirationDate, onExpire }) => {
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
