import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  prefixIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(({ className, prefix, prefixIcon, ...props }, ref) => {
  return (
    <div className={clsx('inline-flex gap-2 items-center', className)}>
      {prefixIcon && <div className='-mr-10 z-10'>{prefixIcon}</div>}
      {prefix}
      <input
        {...props}
        className={clsx(
          'w-full border border-grey-300 rounded-lg bg-grey-500 inline-flex gap-2 items-center p-4 font-medium',
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
