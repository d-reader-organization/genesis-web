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

const bannerImageSrc =
  'https://s3-alpha-sig.figma.com/img/61c1/9b8a/11810ffcc75ee2c0a7437d8b601d64ad?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hl7EkoBj287t~renJ6GHrMGVJIpEWVPoQe6Fq0WM4t~RU8GEtK07JxlipnRXky5XWymNG-~KMI-CQaO03oVyP0XSrVFHGqQOKJex2s7CnrbtZuu5CU07WJTV79SnMSYX50oezMbiC1DXKT6qGHML5z8KyPHq1ErjfyIz02rDCwjnCQdL5pRMOMiASv7XbxjHbJffI3xwCEuVyeGO95URKI8z4ykXD4RodN-VIBM6AcRwBLIjnZy21S~NCrIwT2RpATcBuny6qwvVia8hmH0OdGBI7uBGXWIP1pCltPiO4aW8mG80apMTnoNayWG9EqqMJw15~1fBxc8u7MHIjfKS9g__'

const BannerWidget: React.FC = () => (
  <ContentWithGradientImageBg image={bannerImageSrc}>
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
