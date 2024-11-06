import { cn } from '@/lib/utils'

export const SoonTag: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <span
    className={cn(
      'text-[10px] font-bold leading-tight text-grey-600 px-1.5 py-1 bg-grey-300 rounded-lg min-w-[42px] max-h-5 ml-1',
      className
    )}
  >
    SOON
  </span>
)
