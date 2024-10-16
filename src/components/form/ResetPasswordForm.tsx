'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader } from '../shared/Loader'
import { resetPasswordAction } from '@/app/lib/actions/auth/reset-password'
import { DescriptionText } from '../shared/DescriptionText'
import { passwordDescriptionText } from '@/constants/general'

type Props = {
  verificationToken: string
}

export const ResetPasswordForm: React.FC<Props> = ({ verificationToken }) => {
  const [state, action] = useFormState(resetPasswordAction.bind(null, verificationToken), null)
  React.useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    } else if (state?.success) {
      toast({
        title: 'Success',
        description: `Password reset successful!`,
        variant: 'success',
      })
    }
  }, [state?.error, state?.success, toast])

  return (
    <form action={action} className='flex flex-col items-center gap-4'>
      <div className='flex flex-col'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <DescriptionText text={passwordDescriptionText} />
          <Input className='max-w-md' placeholder='********' name='newPassword' type='password' />
        </div>
        {!state?.success && state?.error && <p className='text-red-600'>{state.error}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='w-fit min-w-36 px-10' type='submit' aria-disabled={pending}>
      {pending ? <Loader /> : <p>Update</p>}
    </Button>
  )
}
