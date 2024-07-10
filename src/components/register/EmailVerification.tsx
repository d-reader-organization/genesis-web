'use client'

import React from 'react'
import { Text } from '../ui/Text'
import MailIcon from 'public/assets/vector-icons/mail-icon.svg'
import { Button, ButtonLink } from '../ui'
import { RoutePath } from '@/enums/routePath'

type Props = {
  redirectTo: string | null
}

const EmailVerificationContent: React.FC<Props> = ({ redirectTo }) => (
  <main className='container mb-4 md:mb-8 sm:p-0 flex flex-col max-w-md gap-4'>
    <Text as='h1' className='text-center pt-8 sm:mb-8 font-semibold'>
      Check your mail
    </Text>
    <div className='flex justify-center'>
      <MailIcon className='h-auto w-10 md:w-14' />
    </div>
    <Text as='p' className='text-center tracking-wider'>
      Follow the simple instructions within the email to verify and become eligible for rewards. It might take up to 5
      minutes to receive the mail
    </Text>
    <ButtonLink className='bg-yellow-500 text-grey-600 w-min self-center mt-4' href={redirectTo ?? RoutePath.Home}>
      Next
    </ButtonLink>
    <div className='mt-4 flex flex-col gap-4'>
      <p className='text-sm text-grey-100 text-center'>
        Didn&apos;t get the email?
        <br />
        Check your spam folder{/* before resending */}
      </p>
      <Button variant='link' onClick={() => null}>
        Resend email confirmation link
      </Button>
    </div>
  </main>
)

export { EmailVerificationContent }
