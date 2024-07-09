import { UnauthenticatedNavigation } from '@/components/layout/UnauthenticatedNavigation'
import { Text } from '@/components/ui'
import React from 'react'
import { LoginForm } from '@/components/form/LoginForm'
import { GoogleSignInButton } from '@/components/shared/GoogleSignInButton'
import { ForgotPasswordDialog } from '@/components/shared/dialogs/ForgotPasswordDialog'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

export default async function LoginPage() {
  return (
    <>
      <UnauthenticatedNavigation />
      <main className='container sm:p-0 flex flex-col max-w-xs gap-2'>
        <Text as='h1' className='text-center pt-8 mb-4 sm:mb-8 font-semibold'>
          Welcome back
        </Text>
        <GoogleSignInButton />
        <div className='flex w-full items-center my-4 mx-0 before:flex-1 before:content-[""] before:p-[1px] before:bg-grey-300 before:my-2 before:mr-2 after:flex-1 after:content-[""] after:p-[1px] after:bg-grey-300 after:my-2 after:ml-2 text-base font-normal'>
          or with
        </div>
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
