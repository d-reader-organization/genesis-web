'use client'

import { logoutAction } from '@/app/lib/actions/auth/logout'
import { Button } from '@/components/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LogoutButton: React.FC = () => {
  const { refresh } = useRouter()

  return (
    <Button
      className='py-5'
      variant='outline'
      size='normal'
      onClick={() => {
        logoutAction()
        refresh()
      }}
    >
      <span className='leading-[22.4px]'>Log out</span>
    </Button>
  )
}
