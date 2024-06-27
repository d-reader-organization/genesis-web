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
        className='w-full border-[1.5px] border-grey-300 border-solid rounded-lg bg-grey-500 inline-flex gap-2 items-center pl-9 sm:py-4 py-[14px] pr-4'
        ref={ref}
      ></input>
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
