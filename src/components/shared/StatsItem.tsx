import { Text } from '../ui'

interface Props {
  label: string
  value: string | number | undefined
}

export const StatsItem: React.FC<Props> = ({ label, value }) => (
  <div className='flex justify-between'>
    <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase max-sm:text-xs'>
      {label}
    </Text>
    <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-sm'>
      {value}
    </Text>
  </div>
)
