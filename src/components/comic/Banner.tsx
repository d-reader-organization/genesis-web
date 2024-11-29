'use client'

import React from 'react'
import PageBanner from 'public/assets/page-banner.png'
import { useIsMobile } from '@/hooks/useBreakpoints'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  banner?: string
  cover?: string
  logo?: string
}

export const ComicBanner: React.FC<Props> = ({ banner, cover, logo }) => {
  const isMobile = useIsMobile()
  const hasHeroImage = isMobile ? !!cover : !!banner
  const heroImage = isMobile ? cover : banner
  const heroImageWithFallback = heroImage || PageBanner.src
  return (
    <div
      className='bg-cover bg-no-repeat bg-center relative -z-[1] w-full h-[65vh] max-h-[620px]'
      style={{ backgroundImage: `url('${heroImageWithFallback}')` }}
    >
      <div
        className={clsx(
          'absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full',
          `${hasHeroImage ? 'comic-banner-standard' : 'comic-banner-simpler'}`
        )}
      />
      {logo && (
        <Image
          src={logo}
          priority
          width={600}
          height={300}
          className='w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 object-contain max-h-[100px] max-w-[60%] sm:max-w-[50%] sm:max-h-[120px] md:max-w-[33%] md:max-h-[140px] lg:max-w-[25%] lg:max-h-40'
          alt=''
        />
      )}
    </div>
  )
}
