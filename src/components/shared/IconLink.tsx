import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    Icon?: React.FC
    blank?: boolean
    clickableEffect?: boolean
  }

export const IconLink: React.FC<Props> = ({
  Icon,
  href,
  blank = false,
  clickableEffect = false,
  className,
  children,
  ...props
}) => {
  if (!href) return null

  return (
    <Link
      className={clsx(className, 'flex justify-center items-center size-8 leading-[0] hover:brightness-110', {
        'cursor-pointer pointer-events-[all]': clickableEffect,
      })}
      target={blank ? '_blank' : undefined}
      href={href || '#'}
      {...props}
    >
      {children || (Icon && <Icon />)}
    </Link>
  )
}
