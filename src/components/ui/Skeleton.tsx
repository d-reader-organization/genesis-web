import { cn } from '@/utils/general'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-2xl bg-grey-300', className)} {...props} />
}

export { Skeleton }
