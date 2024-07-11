import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default: 'bg-yellow-500 rounded-lg text-black py-8 px-4 font-semibold text-base',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline: 'border border-grey-300 text-white bg-transparent w-full text-base font-semibold',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost: 'bg-transparent text-base font-normal text-grey-100',
        link: 'text-base text-important-color bg-transparent font-normal',
      },
      size: {
        default: 'h-12 p-4',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    backgroundColor?: 'important' | 'transparent' | 'grey-100' | 'green-500' | 'yellow-500' | 'grey-600'
    borderColor?: 'important' | 'transparent' | 'grey-100' | 'grey-300'
    clickableEffect?: boolean
    blank?: boolean
    noMinWidth?: boolean
    bold?: boolean
  }

const ButtonLink: React.FC<Props> = ({
  backgroundColor = 'grey-100',
  borderColor = 'transparent',
  clickableEffect = true,
  noMinWidth = false,
  blank = false,
  bold = false,
  className,
  ...props
}) => {
  return (
    <Link
      className={clsx(
        className,
        'flex justify-center items-center min-w-40 p-[14px] rounded-lg border-none cursor-pointer text-base font-semibold hover:brightness-105',
        {
          'button-link--background-color-important': backgroundColor === 'important',
          'bg-transparent': backgroundColor === 'transparent',
          'button-link--background-color-grey-100': backgroundColor === 'grey-100',
          'button-link--background-color-grey-600': backgroundColor === 'grey-600',
          'button-link--background-color-green-500': backgroundColor === 'green-500',
          'button-link--background-color-yellow-500': backgroundColor === 'yellow-500',
          'button-link--border-color-important': borderColor === 'important',
          'button-link--border-color-transparent': borderColor === 'transparent',
          'border border-grey-100': borderColor === 'grey-100',
          'button-link--border-color-grey-300': borderColor === 'grey-300',
          'button-link--clickable-effect': clickableEffect,
          'button-link--no-min-width': noMinWidth,
          'button-link--bold': bold,
        }
      )}
      target={blank ? '_blank' : props.target}
      {...props}
    ></Link>
  )
}
ButtonLink.displayName = 'ButtonLink'

export { Button, ButtonLink, buttonVariants }
