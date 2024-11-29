'use client'

import Intercom from '@intercom/messenger-js-sdk';
import { User } from '@/models/user';

type Props = { user?: User }

export const IntercomClient: React.FC<Props> = ({ user }) => {

  Intercom({
    app_id: 'kqybu780',
    user_id: user?.id.toString(),
    name: user?.name,
    email: user?.email
  });


  return null
}
