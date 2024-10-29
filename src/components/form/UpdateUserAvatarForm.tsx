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
import { Text, toast } from '../ui'
import FileUpload from '../shared/FileUpload'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'
import { Loader } from '../shared/Loader'

type Props = {
  id: string | number
  avatar: string
}

export const UpdateUserAvatarForm: React.FC<Props> = ({ id, avatar }) => {
  const [showLoader, toggleLoader] = useToggle()
  const form = useForm<z.infer<typeof updateUserAvatarValidationSchema>>({
    resolver: zodResolver(updateUserAvatarValidationSchema),
    defaultValues: {
      avatar,
    },
  })

  const { refresh } = useRouter()
  const handleAvatarUpdateFormSubmit = async (data: UpdateUserAvatarData) => {
    toggleLoader()

    if (data.avatar) {
      const formData = new FormData()
      formData.append('avatar', data.avatar)

      const { errorMessage } = await updateUserAvatar(id, formData)

      if (errorMessage) {
        toast({ description: errorMessage, variant: 'error' })
      } else {
        toast({ description: 'Avatar updated !', variant: 'success' })
        refresh()
      }
    }
    toggleLoader()
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
              {showLoader ? <Loader /> : 'Update Avatar'}
            </Button>
          </div>
          <FormControl>
            <FileUpload
              id='avatar'
              onUpload={(files) => form.setValue('avatar', files[0]?.file)}
              previewUrl={avatar ?? null}
            />
          </FormControl>
        </div>
      </form>
    </Form>
  )
}
