import Link from 'next/link'
import { Text } from '../ui/Text'
import { cn } from '@/utils/general'
import { SoonTag } from '../shared/Tags'

type NavItemLinkProps = {
  isActive: boolean
  isComingSoon?: boolean
  href: string
  title: string
}

export const NavItemLink: React.FC<NavItemLinkProps> = ({ isActive, isComingSoon = false, href, title }) =>
  isComingSoon ? (
    <div className='flex items-center gap-1'>
      <Text as='h4' styleVariant='secondary-heading' className='text-grey-300'>
        {title}
      </Text>
      {isComingSoon ? <SoonTag /> : null}
    </div>
  ) : (
    <Link className={cn('hover:text-white', isActive ? 'text-yellow-500' : 'text-grey-100')} href={href}>
      <Text as='h4' styleVariant='secondary-heading'>
        {title}
      </Text>
    </Link>
  )
