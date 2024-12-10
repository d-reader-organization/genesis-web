import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'
import { DEFAULT_ICON_CLASSNAME } from '@/constants/imageSizes'

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
      className={cn(
        'flex justify-center items-center leading-[0] hover:brightness-110 p-1 px-2 sm:p-2 sm:px-3',
        clickableEffect ? 'cursor-pointer pointer-events-[all]' : '',
        className
      )}
      target={blank ? '_blank' : undefined}
      href={href || '#'}
      {...props}
      prefetch={false}
    >
      {children || (Icon && <Icon className={cn(iconClassName ? iconClassName : DEFAULT_ICON_CLASSNAME)} />)}
    </Link>
  )
}
