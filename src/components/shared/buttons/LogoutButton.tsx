'use client'

import { logoutAction } from '@/app/lib/actions/logout'
import { Button } from '@/components/ui'
import React from 'react'

export const LogoutButton: React.FC = () => (
  <Button className='py-5' variant='outline' size='normal' onClick={() => logoutAction()}>
    <span className='leading-[22.4px]'>Log out</span>
  </Button>
)
