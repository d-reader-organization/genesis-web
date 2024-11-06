import Link from 'next/link'
import { Text, Variant } from '../ui/Text'
import { cn } from '@/lib/utils'
import { SoonTag } from '../shared/Tags'

export type NavigationLinkProps = {
  href: string
  isActive: boolean
  isComingSoon?: boolean
  disabled?: boolean
  as?: Variant
  title: string
}

export const NavItemLink: React.FC<NavigationLinkProps> = ({ href, isActive, title, as = "p", isComingSoon = false, disabled = false }) => {
  return <Link
    className={cn(
      'flex items-center gap-1 text-base font-bold leading-[22.4px] text-grey-100',
      isActive && 'text-yellow-500',
      disabled && 'text-grey-300', 'hover:text-white'
    )}
    href={disabled ? '#' : href}
  >
    <Text as={as} styleVariant='secondary-heading'>
      {title}
    </Text>
    {isComingSoon && <SoonTag />}
  </Link>
}
