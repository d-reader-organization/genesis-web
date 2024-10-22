'use client'

import React from 'react'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormLabel } from '../ui/Form'
import { updateUserAvatarValidationSchema } from '@/constants/schemas'
import { UpdateUserAvatarData } from '@/models/user'
import { updateUserAvatar } from '@/app/lib/api/user/mutations'
import { Text } from '../ui'
import FileUpload from '../shared/FileUpload'

type Props = {
  id: string | number
  avatar: string
}

export const UpdateUserAvatarForm: React.FC<Props> = ({ id, avatar }) => {
  const form = useForm<z.infer<typeof updateUserAvatarValidationSchema>>({
    resolver: zodResolver(updateUserAvatarValidationSchema),
    defaultValues: {
      avatar,
    },
  })

  const handleAvatarUpdateFormSubmit = async (data: UpdateUserAvatarData) => {
    const formData = new FormData()
    if (data.avatar) formData.append('avatar', data.avatar)
    await updateUserAvatar(id, formData)
  }

  return (
    <Form {...form}>
      <div className='text-gray-400 border-b border-gray-400 text-sm font-bold uppercase pb-1'>Assets</div>
      <form onSubmit={form.handleSubmit(handleAvatarUpdateFormSubmit)}>
        <div className='flex justify-between'>
          <div className='flex flex-col justify-between leading-6 gap-3'>
            <div className='flex flex-col gap-3'>
              <FormLabel className='font-bold'>Update avatar image</FormLabel>
              <Text as='p' styleVariant='body-small'>
                Recommended size is 500 x 500px, 3mb max size
              </Text>
            </div>

            <Button type='submit' className='bg-grey-300 text-white w-fit'>
              Update Avatar
            </Button>
          </div>
          <FormControl>
            <FileUpload id='avatar' onUpload={(file) => form.setValue('avatar', file)} previewUrl={avatar ?? null} />
          </FormControl>
        </div>
      </form>
    </Form>
  )
}
