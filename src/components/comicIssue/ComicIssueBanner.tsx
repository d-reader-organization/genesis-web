'use client'

import React from 'react'
import PageBanner from 'public/assets/page-banner.png'
import { ComicIssue } from '@/models/comicIssue'
import clsx from 'clsx'
import { useIsMobile } from '@/hooks/useBreakpoints'

type Props = {
  comicIssue: ComicIssue
}

export const ComicIssueBanner: React.FC<Props> = ({ comicIssue }) => {
  const isMobile = useIsMobile()
  const heroImage = comicIssue.cover || PageBanner.src
  return (
    <div
      className='bg-cover bg-no-repeat bg-center relative md:absolute -z-[1] w-full h-[65vh] max-h-[620px] blur-none md:blur-[10px]'
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      <div
        className={clsx(
          'absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full',
          isMobile ? 'comic-issue-banner-simpler' : 'comic-issue-banner-standard'
        )}
      />
    </div>
  )
}
