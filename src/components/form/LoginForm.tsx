'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React, { Suspense } from 'react'
import { loginAction } from '@/app/lib/actions/login'
import { useFormState, useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { redirectToKey } from '@/constants/general'
import { Loader } from '../shared/Loader'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' type='submit' aria-disabled={pending}>
      {pending ? <Loader /> : <p>Login</p>}
    </Button>
  )
}

const Form: React.FC = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(redirectToKey)
  const [state, action] = useFormState(loginAction.bind(null, redirectTo), null)
  React.useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    }
  }, [state?.error, toast])

  return (
    <form action={action} className='space-y-8'>
      <div className='space-y-6'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Email or username</Label>
          <Input className='max-w-md' placeholder='john.doe@dreader.io' name='nameOrEmail' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <Input className='max-w-md' placeholder='********' type='password' name='password' />
        </div>
        {!state?.success && state?.error && <p className='text-red-600'>{state.error}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

export const LoginForm: React.FC = () => (
  <Suspense>
    <Form />
  </Suspense>
)
