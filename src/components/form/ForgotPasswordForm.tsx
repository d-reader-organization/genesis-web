'use client'

import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/Form'
import { useRequestUserPasswordReset } from '@/api/user/queries/useRequestUserPasswordReset'
import { forgotPasswordSchema } from '@/constants/schemas'

type Props = {
  onClose: () => void
}

export const ForgotPasswordForm: React.FC<Props> = ({ onClose }) => {
  const { mutateAsync: requestPasswordReset } = useRequestUserPasswordReset()
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      nameOrEmail: '',
    },
  })

  const onSubmit = async ({ nameOrEmail }: z.infer<typeof forgotPasswordSchema>): Promise<void> => {
    requestPasswordReset({ nameOrEmail })
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='nameOrEmail'
          render={({ field }) => (
            <FormItem className='p-4'>
              <FormControl>
                <Input className='w-full' placeholder='john.doe@dreader.io' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full border-t-2 border-grey-600'>
          <Button
            className='p-4 w-full border-r-2 border-grey-600 rounded-r-none'
            onClick={onClose}
            type='button'
            variant='ghost'
          >
            Cancel
          </Button>
          <Button className='p-4 w-full rounded-l-none' type='submit' variant='ghost'>
            Send
          </Button>
        </div>
      </form>
    </Form>
  )
}
