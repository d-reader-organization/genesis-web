'use client'

import { register } from '@/app/lib/actions'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { DividerWithText } from '../shared/Divider'
import { GoogleSignInButton } from '../shared/GoogleSignInButton'
import { Text } from '../ui/Text'
import { DescriptionText } from '../shared/DescriptionText'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { TermsOfServiceAndPrivacyPolicy } from '../shared/TermsOfServiceAndPrivacyText'

type Props = { isGoogleSignUp?: boolean }

const CreateAccountContent: React.FC<Props> = ({ isGoogleSignUp = false }) => (
  <main className='container mb-4 md:mb-8 sm:p-0 flex flex-col max-w-sm gap-2'>
    <Text as='h1' className='text-center pt-8 mb-4 sm:mb-8 font-semibold'>
      {isGoogleSignUp ? 'Set your details' : 'Welcome!'}
    </Text>
    <GoogleSignInButton buttonText='Sign up with google' />
    <DividerWithText text='or with' />
    <RegisterForm />
    <Link className='flex justify-center hover:brightness-150 font-semibold mb-4' href={RoutePath.Login}>
      <Text as='p' className='text-grey-100'>
        Already have account?&nbsp;
      </Text>
      <Text as='p' className='text-important-color'>
        Log In
      </Text>
    </Link>
    <TermsOfServiceAndPrivacyPolicy />
  </main>
)

const RegisterButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' type='submit' aria-disabled={pending}>
      Register
    </Button>
  )
}

const RegisterForm: React.FC = () => {
  const [state, action] = useFormState(register, null)

  return (
    <form action={action} className='flex flex-col gap-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Username</Label>
          <DescriptionText text='3-20 chars. Numbers, dashes, underscores allowed' />
          <Input placeholder='john-doe' name='name' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Email</Label>
          <Input placeholder='john.doe@gmail.com' name='email' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <DescriptionText text='8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number' />
          <Input placeholder='********' type='password' name='password' />
        </div>
        {state && <p className='text-red-600'>{state}</p>}
      </div>
      <RegisterButton />
    </form>
  )
}

export { CreateAccountContent }
