import React from 'react'

interface HeaderProps {
  title: string
  subtitle: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 lg:gap-8 lg:-mt-7 lg:mb-10'>
      <h2 className="flex justify-center text-center text-white font-semibold md:h-6 md:h3 md:leading-10 md:tracking-tight">
        {title}
      </h2>
      <p className="flex justify-center text-center text-white text-base font-medium leading-snug">
        {subtitle}
      </p>
    </div>
  )
}

export default Header