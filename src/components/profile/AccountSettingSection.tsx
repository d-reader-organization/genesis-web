'use client'

import React from 'react'
import { UpdateUserAvatarForm } from '../form/UpdateUserAvatarForm'
import { UpdatePasswordForm } from '../form/UpdatePasswordForm'
import { UpdateUserDetailsForm } from '../form/UpdateUserDetailsForm'
import { User } from '@/models/user'

type Props = {
  user: User
}

export const AccountSettingSection: React.FC<Props> = ({ user }) => {
  const { id, name, email, avatar } = user

  return (
    <div className='flex flex-col px-2 gap-4'>
      <div className='py-8'>
        <h2 className='text-2xl font-bold'>Account settings</h2>
        <p className='italic text-gray-400'>Manage your dReader user profile</p>
      </div>

      <UpdateUserAvatarForm id={id} avatar={avatar} />
      <UpdateUserDetailsForm id={id} name={name} email={email} />
      <UpdatePasswordForm id={id} />
    </div>
  )
}
