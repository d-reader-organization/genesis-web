export const generateRandom = (max = 1, min = 0) => {
  return Math.floor(Math.random() * max + min)
}

type FormatCurrency = {
  value: number
  currency?: string
  divisor?: number
  fractionDigits?: number
}

export const formatCurrency = ({ value, currency = '$', divisor = 1, fractionDigits = 2 }: FormatCurrency): string => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  const suffix = currency ? currency : ''
  if (!value) return '-.--'

  const scaledValue = value / divisor
  return suffix + numberFormatter.format(scaledValue)
}

export const formatPercentage = (value: number): string => {
  return value.toString() + '%'
}

export const roundNumber = (number: number | null, maxDecimals = 1) => {
  if (!number) return number
  const decimalUnits = Math.pow(10, maxDecimals)
  return Math.round(number * decimalUnits) / decimalUnits
}

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString()
}
