'use client'

import { ButtonLink } from '@/components/ui/ButtonLink'
import React from 'react'

type Props = {
  href: string
}

export const SignInOrRegisterLinkButton: React.FC<Props> = ({ href }) => (
  <ButtonLink className='w-full' variant='white' subVariant={1} size='lg' href={href}>
    Sign In / Register
  </ButtonLink>
)
