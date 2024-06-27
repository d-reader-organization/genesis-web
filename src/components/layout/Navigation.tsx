import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/useBreakpoints'
import { BottomNavigation } from './BottomNavigation'

type Props = {
  paramId?: string | number
}

export const Navigation: React.FC<Props> = ({ paramId }) => {
  const pathname = usePathname()

  const isHome = pathname === RoutePath.Home
  const isDiscover = pathname.startsWith(RoutePath.Discover)
  // const isLibrary = pathname.startsWith(RoutePath.Library)
  const isProfile = pathname.startsWith(RoutePath.Profile)

  const isMobile = useIsMobile()
  const isMint = paramId ? pathname === RoutePath.Mint(paramId) || RoutePath.ComicIssue(paramId) : false
  return isMobile ? <BottomNavigation /> : <div>Desktop version</div>
}
