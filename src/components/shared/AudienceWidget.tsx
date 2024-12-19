import { AudienceType } from '@/enums/audienceType'
import React from 'react'

type Props = {
  audience: AudienceType
}

const agePerAudience = (audience: AudienceType) => {
  switch (audience) {
    case AudienceType.Everyone:
      return '12'
    case AudienceType.Teen:
      return '13'
    case AudienceType.TeenPlus:
      return '16'
    case AudienceType.Mature:
      return '18'
    default:
      return '12'
  }
}

export const AudienceWidget: React.FC<Props> = ({ audience }) => (
  <div className='text-[12px] font-bold p-1 rounded-full border-2 text-orange-400 border-orange-400 size-6 flex items-center'>
    {agePerAudience(audience)}
  </div>
)
