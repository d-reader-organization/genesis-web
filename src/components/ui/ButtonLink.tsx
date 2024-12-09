import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'

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
      className={cn(
        'flex justify-center items-center min-w-40 p-[14px] rounded-lg cursor-pointer text-base font-semibold hover:brightness-105',
        className,
        {
          'bg-important-color': backgroundColor === 'important',
          'bg-transparent': backgroundColor === 'transparent',
          'button-link--background-color-grey-100': backgroundColor === 'grey-100',
          'button-link--background-color-grey-600': backgroundColor === 'grey-600',
          'button-link--background-color-green-500': backgroundColor === 'green-500',
          'button-link--background-color-yellow-500': backgroundColor === 'yellow-500',
          'button-link--border-color-important': borderColor === 'important',
          'button-link--border-color-transparent': borderColor === 'transparent',
          'border border-grey-100': borderColor === 'grey-100',
          'border border-grey-300': borderColor === 'grey-300',
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

export { ButtonLink }
