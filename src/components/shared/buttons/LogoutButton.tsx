'use client'

import { logoutAction } from '@/app/lib/actions/auth/logout'
import { Button } from '@/components/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LogoutButton: React.FC = () => {
  const { refresh } = useRouter()

  return (
    <Button
      variant='outline'
      size='md'
      onClick={() => {
        logoutAction()
        refresh()
      }}
    >
      <span className='leading-[22.4px]'>Log out</span>
    </Button>
  )
}
