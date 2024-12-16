export const formatTime = (secs: number, expirationDate?: string) => {
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
      countdownString += `${hours}h ${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
    } else if (minutes || seconds) {
      countdownString += `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
    }
  }

  return { seconds, minutes, hours, days, isDue: totalSeconds === 0, countdownString }
}

export const calculateRemaningSeconds = (expirationDate?: string) => {
  if (!expirationDate) return 0
  const now = new Date().getTime()
  const milliSecondsDistance = new Date(expirationDate).getTime() - now
  if (milliSecondsDistance > 0) return milliSecondsDistance / 1000
  return 0
}
