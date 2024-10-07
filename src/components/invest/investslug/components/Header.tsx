import React from 'react'

interface HeaderProps {
  title: string
  subtitle: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className='flex flex-col gap-10 h-[150px]'>
      <div className="flex flex-row justify-center self-stretch h-6 text-center text-white text-[40px] font-semibold font-['Obviously Narrow'] leading-10 tracking-tight">
        {title}
      </div>
      <div className="flex flex-row justify-center self-stretch text-center text-white text-base font-medium font-['Satoshi'] leading-snug">
        {subtitle}
      </div>
    </div>
  )
}

export default Header
