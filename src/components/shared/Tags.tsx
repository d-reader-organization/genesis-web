import { cn } from '@/utils/general'

export const SoonTag: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <div className={cn('h-5 flex justify-center items-center rounded-lg bg-grey-300 w-fit px-2', className)}>
    <span className='text-xxs font-bold text-grey-600'>SOON</span>
  </div>
)
