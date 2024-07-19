import { RoutePath } from '@/enums/routePath'
import React from 'react'
import { ButtonLink } from '../ui/Button'
import WenImageSrc from 'public/assets/wen.png'
import Image from 'next/image'

type Props = {
  comicIssueId: string
  discountAmount?: number
}

export const SignUpBanner: React.FC<Props> = ({ comicIssueId, discountAmount }) => {
  return (
    <div className='flex flex-col justify-between rounded-lg border border-grey-200 bg-grey-500 p-4 min-h-[224px] md:max-h-[160px] md:min-h-[160px] relative'>
      <DiscountSection comicIssueId={comicIssueId} discountAmount={discountAmount} />
      <SignUpButton comicIssueId={comicIssueId} />
      <LoginLink comicIssueId={comicIssueId} />
      <WenImage />
    </div>
  )
}

const DiscountSection: React.FC<Props> = ({ discountAmount = 10 }) => (
  <div className='text-lg md:text-2xl font-bold flex flex-col'>
    <span className='text-important-color leading-[21px] md:leading-7'>Registered users&nbsp;</span>
    <span className='leading-[21px] md:leading-7'>get -{discountAmount}% off on this mint!</span>
  </div>
)

const LoginLink: React.FC<Omit<Props, 'discountAmount'>> = ({ comicIssueId }) => {
  return (
    <ButtonLink
      href={`${RoutePath.Login}?redirectTo=/mint/${comicIssueId}`}
      clickableEffect={false}
      backgroundColor='transparent'
      className='text-grey-100 text-sm self-center md:self-start md:pl-0 pt-0'
    >
      <span className='font-medium'>Already have account?&nbsp;</span>
      <span className='text-important-color font-medium'>Log in</span>
    </ButtonLink>
  )
}

const SignUpButton: React.FC<Omit<Props, 'discountAmount'>> = ({ comicIssueId }) => {
  return (
    <ButtonLink
      className='bg-white flex w-full text-grey-600 h-14 md:w-min md:self-end'
      href={`${RoutePath.Register}?redirectTo=/mint/${comicIssueId}`}
    >
      Sign up
    </ButtonLink>
  )
}

const WenImage: React.FC = () => (
  <Image
    className='h-[124px] w-[140px] md:h-[180px] md:w-44 absolute -right-2 -top-9 md:right-1/2 md:left-1/2 md:-top-[21px]'
    src={WenImageSrc}
    alt='Wen Image'
  />
)
