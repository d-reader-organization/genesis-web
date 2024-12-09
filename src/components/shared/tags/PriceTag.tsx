import SolanaIcon from 'public/assets/vector-icons/solana-icon.svg'
import SolanaColoredIcon from 'public/assets/vector-icons/solana-colored-icon.svg'
import { formatPrice } from '@/utils/helpers'
import { isNil } from 'lodash'
import { roundNumber } from '@/utils/numbers'
import { Text } from '../../ui'
import clsx from 'clsx'
import React from 'react'
import { TextProps } from '../../ui'
import { cn } from '@/lib/utils'
import { DEFAULT_ICON_CLASSNAME } from '@/constants/imageSizes'

interface Props extends Partial<TextProps> {
  price?: number | null
  bold?: boolean
  reverse?: boolean
  from?: boolean
  symbol?: boolean
  icon?: boolean
  colorfulIcon?: boolean
  inline?: boolean
  maxDecimals?: number
  iconClassName?: string
}

export const PriceTag: React.FC<Props> = ({
  price,
  bold = false,
  reverse = false,
  from = false,
  inline = true,
  symbol = false,
  icon = false,
  colorfulIcon = false,
  maxDecimals,
  as: as = 'p',
  styleVariant = 'body-normal',
  className,
  iconClassName,
  ...props
}) => {
  const TypographyWrapper: React.FC<{ children: React.ReactNode }> = (tprops) => {
    return (
      <Text
        as={as}
        styleVariant={styleVariant}
        className={clsx(
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

  return (
    <TypographyWrapper>
      {from ? 'from ' : ''}
      {symbol && <span>◎</span>}
      {icon && (
        <SolanaIcon
          style={{
            marginLeft: reverse ? '0.2rem' : '0.5rem',
            marginRight: reverse ? '0.5rem' : '0.2rem',
          }}
          className={cn(iconClassName ? iconClassName : DEFAULT_ICON_CLASSNAME)}
        />
      )}
      {colorfulIcon && (
        <SolanaColoredIcon
          style={{
            marginLeft: reverse ? '0.2rem' : '0.5rem',
            marginRight: reverse ? '0.5rem' : '0.2rem',
          }}
          className={cn(iconClassName ? iconClassName : DEFAULT_ICON_CLASSNAME)}
        />
      )}
      {roundedPrice}
    </TypographyWrapper>
  )
}
