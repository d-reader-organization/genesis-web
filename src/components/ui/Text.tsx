import React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
type StyleVariant =
  | 'primary'
  | 'secondary'
  | 'body-small'
  | 'body-xlarge'
  | 'body-large'
  | 'body-normal'
  | 'body-small'
  | 'body-xsmall'
type FontWeight = 'bold' | 'semibold' | 'medium' | 'normal'

type TextProps = {
  as: Variant
  styleVariant: StyleVariant
  className?: string
  children: React.ReactNode
  fontWeight?: FontWeight
}

const variantStyles: Record<Variant, string> = {
  h1: 'text-48 tracking-0096',
  h2: 'text-40 tracking-008',
  h3: 'text-32 tracking-0064',
  h4: 'text-24 tracking-0048',
  h5: 'text-20 tracking-004',
  h6: 'text-16 tracking-0032',
  p: 'text-base font-normal font-satoshi',
  span: 'text-base font-normal font-satoshi',
}

const styleVariants: Record<StyleVariant, string> = {
  primary: 'font-semibold leading-tight font-obviouslyNarrow',
  secondary: 'font-bold leading-tight font-satoshi tracking-normal',
  'body-xlarge': 'text-xl',
  'body-large': 'text-lg',
  'body-normal': 'text-base',
  'body-small': 'text-sm',
  'body-xsmall': 'text-xs',
}

const fontWeightVariants: Record<FontWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
}

export const Text: React.FC<TextProps> = ({ as: Component, styleVariant, className, children, fontWeight }) => {
  return (
    <Component
      className={cn(
        variantStyles[Component],
        styleVariants[styleVariant],
        fontWeight && fontWeightVariants[fontWeight],
        className
      )}
    >
      {children}
    </Component>
  )
}
