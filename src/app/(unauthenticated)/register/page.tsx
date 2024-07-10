import React from 'react'
import { UnauthenticatedNavigation } from '@/components/layout/UnauthenticatedNavigation'
import { RegisterBody } from '@/components/register/Body'

export default function RegisterPage() {
  return (
    <>
      <UnauthenticatedNavigation />
      <RegisterBody />
    </>
  )
}
