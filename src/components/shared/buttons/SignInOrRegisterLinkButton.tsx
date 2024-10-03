'use client'

import { ButtonLink } from '@/components/ui'
import React from 'react'

type Props = {
  href: string
}

export const SignInOrRegisterLinkButton: React.FC<Props> = ({ href }) => (
  <ButtonLink
    className='bg-white rounded-xl py-5 flex items-center justify-center h-[52px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]'
    href={href}
  >
    <span className='text-base font-bold leading-[22.4px] text-grey-600'> Sign In / Register</span>
  </ButtonLink>
)
