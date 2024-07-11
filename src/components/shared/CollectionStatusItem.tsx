import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export const CollectionStatusItem: React.FC<Props> = ({ label, value, orientation = 'horizontal', className }) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 w-full',
        orientation === 'vertical' ? 'flex-col justify-center text-center w-max' : ' justify-between',
        className
      )}
    >
      <span className='text-grey-100 uppercase text-base md:text-lg'>{label}</span>
      <span className='font-bold text-[22px] min-w-[70px]'>{value}</span>
    </div>
  )
}
