export const generateRandom = (max = 1, min = 0) => {
  return Math.floor(Math.random() * max + min)
}

export const formatCurrency = (value?: number, currency = '') => {
  const numberFormater = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const suffix = currency ? ` ${currency}` : ''
  if (!value) return '-.--' + suffix
  return numberFormater.format(value) + suffix
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const formatUSD = (value: number) => {
  return usdFormatter.format(value)
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
