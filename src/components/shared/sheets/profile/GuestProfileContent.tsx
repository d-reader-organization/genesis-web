import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { ProductSocials } from '../../ProductSocials'
import { ContentWithGradientImageBg } from '../../ContentWithGradientImageBg'
import { SignInOrRegisterLinkButton } from '../../buttons/SignInOrRegisterLinkButton'
import BunbunBanner from 'public/assets/images/bunbun_yg4h.jpg'
import { WalletSection } from './WalletSection'

export const GuestProfileContent: React.FC = () => (
  <div className='flex flex-col justify-between gap-6 h-full'>
    <div className='mt-10'>
      <WalletSection />
    </div>
    <BannerWidget />
    <ProductSocials />
  </div>
)

const BannerWidget: React.FC = () => (
  <ContentWithGradientImageBg image={BunbunBanner.src}>
    <div className='flex flex-col justify-between h-full'>
      <div className='text-2xl leading-[28.8px] font-medium'>
        <span className='font-bold'>Registered & logged&nbsp;</span>
        <span>users get&nbsp;</span>
        <span className='font-bold'>15% OFF&nbsp;</span>
        <span>on all new comic mints!</span>
      </div>
      <SignInOrRegisterLinkButton href={RoutePath.Login} />
    </div>
  </ContentWithGradientImageBg>
)
