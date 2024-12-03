import SolanaIcon from 'public/assets/vector-icons/solana-icon.svg'
import SolanaColoredIcon from 'public/assets/vector-icons/solana-colored-icon.svg'
import { formatPrice } from '@/utils/helpers'
import { isNil } from 'lodash'
import { roundNumber } from '@/utils/numbers'
import { Text } from '../../ui'
import React from 'react'
import { TextProps } from '../../ui'
import { cn } from '@/lib/utils'

interface Props extends Partial<TextProps> {
  price?: number | null
  size?: number
  bold?: boolean
  reverse?: boolean
  from?: boolean
  symbol?: boolean
  icon?: boolean
  colorfulIcon?: boolean
  inline?: boolean
  maxDecimals?: number
}

export const PriceTag: React.FC<Props> = ({
  price,
  size = 16,
  bold = false,
  reverse = false,
  from = false,
  inline = true,
  symbol = false,
  icon = false,
  colorfulIcon = false,
  maxDecimals,
  as = 'p',
  styleVariant = 'body-normal',
  className,
  ...props
}) => {
  const TypographyWrapper: React.FC<{ children: React.ReactNode }> = (tprops) => {
    return (
      <Text
        as={as}
        styleVariant={styleVariant}
        className={cn(
          inline ? 'inline-flex' : 'flex',
          reverse ? 'flex-row-reverse' : 'flex-row',
          'items-center',
          bold ? 'font-bold' : 'font-normal',
          className
        )}
        {...props}
      >
        {tprops.children}
      </Text>
    )
  }

  if (isNil(price)) return <TypographyWrapper>-.--</TypographyWrapper>
  if (price == 0) return <TypographyWrapper>free</TypographyWrapper>

  const formattedPrice = formatPrice(price)
  const roundedPrice = !isNil(maxDecimals) ? roundNumber(formattedPrice, maxDecimals) : formattedPrice

  // Check for prices below the threshold
  const threshold = 0.01 // Default threshold for 2 decimals
  const isBelowThreshold = formattedPrice < threshold

  return (
    <TypographyWrapper>
      {from ? 'from ' : ''}
      {symbol && <span>◎</span>}
      {isBelowThreshold && '~'}
      {isBelowThreshold ? threshold : roundedPrice}
      {icon && (
        <SolanaIcon
          style={{
            width: size,
            height: size,
            marginLeft: reverse ? '0.2rem' : '0.4rem',
            marginRight: reverse ? '0.4rem' : '0.2rem',
          }}
        />
      )}
      {colorfulIcon && (
        <SolanaColoredIcon
          style={{
            width: size,
            height: size,
            marginLeft: reverse ? '0.2rem' : '0.4rem',
            marginRight: reverse ? '0.4rem' : '0.2rem',
          }}
        />
      )}
    </TypographyWrapper>
  )
}
