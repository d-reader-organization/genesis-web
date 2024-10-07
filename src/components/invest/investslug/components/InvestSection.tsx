import Link from 'next/link'
import React from 'react'
import { ProjectInvestData } from '../data/ProjectInvestData'

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString()
}

type Props = {
  project: ProjectInvestData
}

export const InvestSection: React.FC<Props> = ({ project }) => {
  return (
    <div className='flex flex-col sticky top-[100px] w-[28%] h-[550px] min-w-[280px] fixed top-100 overflow-x-auto overflow-y-auto bg-[#1f222a] justify-start items-between md:gap-[30px] p-4 md:p-6 pt-4 rounded-xl'>
      <div className="text-white text-base font-bold font-['Satoshi'] leading-snug">Overall project fund goal:</div>
      <div
        className='h-[10px] bg-[#fceb54] rounded-[27px] mb-4'
        style={{ width: `${(project.current / project.goal) * 100}%`, maxWidth: '367.62px' }}
      />
      <div className="text-[#fceb54] text-[32px] font-semibold font-['Obviously Narrow'] leading-loose tracking-tight">
        ${formatNumberWithCommas(project.current)}
        <div className="text-[#c2c5ce] text-base font-medium font-['Satoshi'] leading-snug ">
          pledged of ${formatNumberWithCommas(project.goal)}
        </div>
      </div>

      <div className='h-[52px] flex-col justify-center items-center inline-flex'>
        <div className="self-stretch text-white text-[32px] font-semibold font-['Obviously Narrow'] leading-loose tracking-tight">
          {formatNumberWithCommas(project.backers)}
        </div>
        <div className="self-stretch text-[#c2c5ce] text-base font-medium font-['Satoshi'] leading-snug">backers</div>
      </div>
      <div className='h-[52px] flex-col justify-center items-bottom inline-flex'>
        <div className="self-stretch align-baseline text-white text-[32px] font-semibold font-['Obviously Narrow'] leading-loose tracking-tight">
          {project.daysLeft}
        </div>
        <div className="self-stretch text-[#c2c5ce] text-base font-medium font-['Satoshi'] leading-snug">days left</div>
      </div>

      <div className='flex-grow' />
      <Link
        href={'placeholder'}
        className='flex justify-center items-center gap-2 self-stretch text-[#15171c] rounded-xl bg-[#fceb54] py-3 pr-2 pl-4 hover:brightness-125 max-h-[36px] md:max-h-[42px]'
      >
        <div className="text-[#15171c] text-base font-bold font-['Satoshi'] leading-snug">Back this project</div>
      </Link>
    </div>
  )
}
