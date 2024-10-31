import { UnauthenticatedNavigation } from '@/components/layout/UnauthenticatedNavigation'
import { Text } from '@/components/ui'
import React from 'react'
import { LoginForm } from '@/components/form/LoginForm'
import { GoogleSignInButton } from '@/components/shared/buttons/GoogleSignInButton'
import { ForgotPasswordDialog } from '@/components/shared/dialogs/ForgotPasswordDialog'
import { DividerWithText } from '@/components/shared/Divider'
import { RegisterLink } from '@/components/register/RegisterLink'

export default async function LoginPage() {
  return (
    <>
      <UnauthenticatedNavigation />
      <main className='container sm:p-0 flex flex-col max-w-md gap-2 mt-8'>
        <Text as='h2' styleVariant='primary-heading' className='text-center mb-8'>
          Welcome back
        </Text>
        <GoogleSignInButton />
        <DividerWithText text='or with' />
        <LoginForm />
        <ForgotPasswordDialog />
        <RegisterLink />
      </main>
    </>
  )
}
