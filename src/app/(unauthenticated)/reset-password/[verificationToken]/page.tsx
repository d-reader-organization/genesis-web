import { ResetPasswordForm } from '@/components/form/ResetPasswordForm'
import React from 'react'

type Params = {
  verificationToken: string
}

export default async function ResetPasswordPage({ params }: { params: Params }) {
  return (
    <main className='h-screen w-full flex justify-center items-center flex-col gap-4'>
      <h1 className='text-5xl font-semibold'>Reset password</h1>
      <ResetPasswordForm verificationToken={params.verificationToken} />
    </main>
  )
}
