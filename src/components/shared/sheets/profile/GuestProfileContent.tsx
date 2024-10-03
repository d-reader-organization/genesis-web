import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { ProductSocials } from '../../ProductSocials'
import { MoreHorizontal } from 'lucide-react'
import PhantomIcon from 'public/assets/vector-icons/phantom.svg'
import SolflareIcon from 'public/assets/vector-icons/solflare.svg'
import UltimateIcon from 'public/assets/vector-icons/ultimate.svg'
import EspressoIcon from 'public/assets/vector-icons/espresso.svg'
import { ConnectButtonV2 } from '../../buttons/ConnectButton'
import { ContentWithGradientImageBg } from '../../ContentWithGradientImageBg'
import { SignInOrRegisterLinkButton } from '../../buttons/SignInOrRegisterLinkButton'
import BunbunBanner from 'public/assets/images/bunbun_yg4h.jpg'

export const GuestProfileContent: React.FC = () => (
  <div className='flex flex-col justify-between gap-6 h-full'>
    <div className='mt-10'>
      <ConnectWalletBox />
    </div>
    <BannerWidget />
    <ProductSocials />
  </div>
)

const ConnectWalletBox: React.FC = () => (
  <div className='rounded-xl bg-grey-500 flex flex-col items-center gap-6 p-4'>
    <div className='text-2xl font-normal leading-[28.8px]'>
      <span className='font-bold'>Quick connect&nbsp;</span>
      <span>your wallet without Signing in.</span>
    </div>
    <div className='flex items-center gap-1.5'>
      <WalletBox>
        <PhantomIcon />
      </WalletBox>
      <WalletBox>
        <SolflareIcon />
      </WalletBox>
      <WalletBox>
        <UltimateIcon />
      </WalletBox>
      <WalletBox>
        <EspressoIcon />
      </WalletBox>
      <WalletBox>
        <MoreHorizontal className='size-6' />
      </WalletBox>
    </div>
    <ConnectButtonV2 onClick={async () => {}} />
  </div>
)

const WalletBox: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='rounded-lg bg-grey-400 flex flex-col justify-center items-center size-14 p-1'>{children}</div>
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
