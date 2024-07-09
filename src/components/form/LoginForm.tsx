'use client'

import { Button, Input, Label } from '@/components/ui'
import React from 'react'
import { login } from '@/app/lib/actions'
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
  const [state, action] = useFormState(login, null)
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
        {state && <p className='text-red-600'>{state}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

export { LoginForm }
