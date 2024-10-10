import Link from 'next/link'
import React from 'react'
import { ProjectInvestData } from '../data/ProjectInvestData'

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString()
}

type Props = {
  project: ProjectInvestData
}

// TODO: Ask how to refactor this component on review, to put it into separete files, maybe just one big one with sections?

export const InvestSection: React.FC<Props> = ({ project }) => {
  return (
    <div className='flex flex-col md:p-5 md:gap-6 md:sticky md:top-[100px] md:max-w-[485px] md:max-h-[550px] min-w-[280px] bg-grey-500 justify-start items-between rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className="text-white text-base font-bold leading-snug">Overall project fund goal:</p>
        <div className='relative max-h-[8px] rounded-[27px] w-full bg-[#44464d] mb-5'>
          <div
            className='max-h-[8px] bg-[#fceb54] rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(project.current / project.goal) * 100}%` }}
          />
        </div>
      </div>
      {/*section2 */}
      <div className='flex flex-col'>
        <div className="text-[#fceb54] text-3xl font-semibold font-['Obviously Narrow'] tracking-tighter">
          ${formatNumberWithCommas(project.current)}
          <div className="text-[#c2c5ce] text-xl font-medium font-['Satoshi'] leading-snug tracking-wide ">
            pledged of ${formatNumberWithCommas(project.goal)}
          </div>
        </div>
      </div>

      {/*section3 */}
      <div className='flex flex-col'>
        <div className="text-white text-3xl font-semibold font-['Obviously Narrow'] tracking-tighter">
          {formatNumberWithCommas(project.backers)}
        </div>
        <div className="text-[#c2c5ce] text-xl font-medium font-['Satoshi'] tracking-wide">backers</div>
      </div>

      {/*section4 */}
      <div className='flex flex-col'>
        <div className="text-white text-3xl font-semibold font-['Obviously Narrow'] tracking-tighter">
          {project.daysLeft}
        </div>
        <div className="text-[#c2c5ce] text-xl font-medium font-['Satoshi'] tracking-wide">days left</div>
      </div>

      <Link
        href={'placeholder'}
        className='flex flex-col justify-center items-center gap-2 self-stretch text-[#15171c] rounded-xl bg-[#fceb54] py-3 pr-2 pl-4 hover:brightness-125 max-h-[60px]'
      >
        <div className="text-[#15171c] text-base font-bold font-['Satoshi'] leading-snug">Back this project</div>
      </Link>
      <div className='flex flex-row max-h-[86px] p-4 bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl justify-start items-center gap-[23px] inline-flex'>
        <div
          className='max-h-[54px] max-w-[54px] p-2.5 bg-white rounded-xl shadow border border-[#56a05e] justify-start items-center gap-2.5 flex'
          style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
        >
          <img src='/assets/images/invest/slug/Arrow.svg' alt='placeholder' />
        </div>

        <div className="text-[#aeaeae] text-base font-medium font-['Satoshi'] leading-snug">
          Estimated <span className='text-white font-bold'>200% return*</span> of investment within 1 year
        </div>
      </div>
    </div>
  )
}
