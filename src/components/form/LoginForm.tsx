'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React from 'react'
import { loginAction } from '@/app/lib/actions/login'
import { useFormState, useFormStatus } from 'react-dom'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' type='submit' aria-disabled={pending}>
      Login
    </Button>
  )
}

const LoginForm: React.FC = () => {
  const [state, action] = useFormState(loginAction, null)
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
          <Input placeholder='john.doe@dreader.io' name='nameOrEmail' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <Input placeholder='********' type='password' name='password' />
        </div>
        {!state?.success && state?.error && <p className='text-red-600'>{state.error}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

export { LoginForm }
