'use client'

import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormItem, FormLabel } from '../ui/Form'
import { updateUserPasswordValidationSchema } from '@/constants/schemas'
import { UpdateUserPassword } from '@/models/user'
import { updateUserPassword } from '@/app/lib/api/user/mutations'
import { Text } from '../ui'

type Props = {
  id: string | number
}

export const UpdatePasswordForm: React.FC<Props> = ({ id }) => {
  const form = useForm<z.infer<typeof updateUserPasswordValidationSchema>>({
    resolver: zodResolver(updateUserPasswordValidationSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const handleUpdatePassword = async (data: UpdateUserPassword) => await updateUserPassword(id, data)

  return (
    <Form {...form}>
      <div className='text-gray-400 border-b border-gray-400 text-sm font-bold uppercase pb-1'>
        Change your password
      </div>
      <form onSubmit={form.handleSubmit(handleUpdatePassword)} className='flex flex-col gap-4'>
        <FormItem>
          <FormLabel className='font-bold'>Current password</FormLabel>
          <FormControl>
            <Input
              {...form.register('oldPassword')}
              type='password'
              placeholder='********'
              className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel className='font-bold'>New password</FormLabel>
          <FormControl>
            <Input
              {...form.register('newPassword')}
              type='password'
              placeholder='********'
              className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
            />
          </FormControl>
          <Text as='p' styleVariant='body-small' className='grey-100'>
            8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number
          </Text>
        </FormItem>
        <Button type='submit' variant='default' className='bg-grey-300 text-white w-fit'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
