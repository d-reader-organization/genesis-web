import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { ProductSocials } from '../../ProductSocials'
import { ContentWithGradientImageBg } from '../../ContentWithGradientImageBg'
import { SignInOrRegisterLinkButton } from '../../buttons/SignInOrRegisterLinkButton'
import BunbunBanner from 'public/assets/images/bunbun_yg4h.jpg'
import { WalletSection } from './WalletSection'
import { usePathname } from 'next/navigation'
import { redirectToKey } from '@/constants/general'

export const GuestProfileContent: React.FC = () => (
  <div className='flex flex-col justify-between gap-6 h-full'>
    <div className='mt-10'>
      <WalletSection />
    </div>
    <BannerWidget />
    <ProductSocials />
  </div>
)

const BannerWidget: React.FC = () => {
  const pathname = usePathname()
  const redirectTo = pathname !== '/' ? `?${redirectToKey}=${pathname}` : ''
  return (
    <ContentWithGradientImageBg className='p-4' image={BunbunBanner.src}>
      <div className='flex flex-col justify-between h-full'>
        <div className='text-2xl leading-[28.8px] font-medium'>
          <span className='font-bold'>Signed in&nbsp;</span>
          <span>users get up to &nbsp;</span>
          <span className='font-bold'>30% OFF&nbsp;</span>
          <span>on all comic mints!</span>
        </div>
        <SignInOrRegisterLinkButton href={`${RoutePath.Login}${redirectTo}`} />
      </div>
    </ContentWithGradientImageBg>
  )
}
