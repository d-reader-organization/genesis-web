import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
    blank?: boolean
    clickableEffect?: boolean
    iconClassName?: string
  }

export const IconLink: React.FC<Props> = ({
  Icon,
  href,
  blank = false,
  clickableEffect = false,
  className,
  iconClassName,
  children,
  ...props
}) => {
  if (!href) return null

  return (
    <Link
      className={clsx(className, 'flex justify-center items-center leading-[0] hover:brightness-110 p-1 px-2 sm:p-2 sm:px-3', {
        'cursor-pointer pointer-events-[all]': clickableEffect,
      })}
      target={blank ? '_blank' : undefined}
      href={href || '#'}
      {...props}
    >
      {children || (Icon && <Icon className={iconClassName} />)}
    </Link>
  )
}