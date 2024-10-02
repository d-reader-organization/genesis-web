import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  prefixIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(({ className, prefix, prefixIcon, ...props }, ref) => {
  return (
    <div className={cn('inline-flex gap-4 items-center', className)}>
      {prefixIcon && <div className='-mr-10 z-10 text-grey-200'>{prefixIcon}</div>}
      {prefix}
      <input
        {...props}
        className={cn(
          'w-[400px] max-w-[400px] max-h-10 rounded-xl bg-white bg-opacity-15 backdrop-blur-[5px] inline-flex gap-2 items-center pl-4 py-3 font-medium placeholder:text-grey-200 placeholder:pl-2 placeholder:text-sm placeholder:font-medium',
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
