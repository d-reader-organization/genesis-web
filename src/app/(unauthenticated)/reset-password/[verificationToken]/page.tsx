import { ResetPasswordForm } from '@/components/form/ResetPasswordForm'
import { Text } from '@/components/ui'
import React from 'react'

type Params = {
  verificationToken: string
}

export default async function ResetPasswordPage({ params }: { params: Params }) {
  return (
    <main className='h-screen w-full flex justify-center items-center flex-col gap-4'>
      <Text as='h1' styleVariant='primary-heading'>
        Reset password
      </Text>
      <ResetPasswordForm verificationToken={params.verificationToken} />
    </main>
  )
}
