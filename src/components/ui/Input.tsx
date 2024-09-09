import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  prefixIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(({ className, prefix, prefixIcon, ...props }, ref) => {
  return (
    <div className={cn('inline-flex gap-0 items-center', className)}>
      {prefixIcon && <div className='-mr-8 z-10'>{prefixIcon}</div>}
      {prefix}
      <input
        {...props}
        className={cn(
          'w-full rounded-2xl border-b border-b-grey-300 bg-grey-600 backdrop-blur-[5px] inline-flex gap-2 items-center p-4 font-medium placeholder:pl-2',
          prefixIcon && 'pl-9',
          props.type === 'password' && 'placeholder:translate-y-1'
        )}
        ref={ref}
      ></input>
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
