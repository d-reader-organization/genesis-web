import { UnauthenticatedNavigation } from '@/components/layout/UnauthenticatedNavigation'
import { Text } from '@/components/ui'
import React from 'react'
import { LoginForm } from '@/components/form/LoginForm'
import { GoogleSignInButton } from '@/components/shared/buttons/GoogleSignInButton'
import { ForgotPasswordDialog } from '@/components/shared/dialogs/ForgotPasswordDialog'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { DividerWithText } from '@/components/shared/Divider'

export default async function LoginPage() {
  return (
    <>
      <UnauthenticatedNavigation />
      <main className='container sm:p-0 flex flex-col max-w-md gap-2'>
        <Text as='h1' className='text-center pt-8 mb-4 sm:mb-8 font-semibold'>
          Welcome back
        </Text>
        <GoogleSignInButton />
        <DividerWithText text='or with' />
        <LoginForm />
        <ForgotPasswordDialog />
        <Link className='flex hover:brightness-150' href={RoutePath.Register}>
          <Text as='p' className='text-grey-100'>
            Don&apos;t have an account?&nbsp;
          </Text>
          <Text as='p' className='text-important-color'>
            Register here
          </Text>
        </Link>
      </main>
    </>
  )
}
