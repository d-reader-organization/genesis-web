import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString()
}

type Props = {
  project: ProjectInvestData
}

// TODO: Ask how to refactor this component on review, to put it into separete files, maybe just one big one with sections?

export const InvestSection: React.FC<Props> = ({ project }) => {
  return (
    <div className='flex flex-col md:p-6 md:gap-[1.8rem] md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[300px] md:h-[550px] bg-grey-500 justify-between items-start rounded-xl shadow'>
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-white text-base font-bold leading-snug'>Overall project fund goal:</p>
        <div className='relative h-[8px] rounded-[27px] w-full bg-[#44464d]'>
          <div
            className='h-[8px] bg-[#fceb54] rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(project.current / project.goal) * 100}%` }}
          />
        </div>
      </div>

      <div className='flex flex-col'>
        <h2 className='text-[#fceb54] text-[32px] font-semibold leading-none tracking-tight'>
          ${formatNumberWithCommas(project.current)}
        </h2>
        <p className='text-[#c2c5ce] text-base font-medium leading-relaxed'>
          pledged of ${formatNumberWithCommas(project.goal)}
        </p>
      </div>

      <div className='flex flex-col'>
        <h2 className='text-white text-[32px] font-semibold leading-none tracking-tight'>
          {formatNumberWithCommas(project.backers)}
        </h2>
        <p className='text-[#c2c5ce] text-base font-medium leading-relaxed'>backers</p>
      </div>

      <div className='flex flex-col'>
        <h2 className='text-white text-[32px] font-semibold tracking-tight leading-none'>{project.daysLeft}</h2>
        <p className='text-[#c2c5ce] text-base font-medium leading-relaxed'>days left</p>
      </div>

      <Link
        href={'placeholder'}
        className='flex flex-col w-full max-h-[52px] p-4 justify-center items-center self-stretch text-[#15171c] rounded-xl bg-[#fceb54] hover:brightness-100'
      >
        <p className='text-[#15171c] text-base font-bold leading-snug'>Back this project</p>
      </Link>

      <div className='flex flex-row w-full justify-center items-center p-[12px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl gap-[14px]'>
        <div
          className='max-h-[54px] max-w-[54px] p-[10px] bg-white rounded-xl shadow border border-[#56a05e] justify-start items-center gap-2 flex'
          style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
        >
          <Image
            src='/assets/images/invest/slug/Arrow.svg'
            alt='Invest Arrow'
            width={45}
            height={50}
            layout='intrinsic'
          />
        </div>

        <p className='text-[#aeaeae] text-base font-medium leading-snug'>
          Estimated <span className='text-white font-bold'>200% return*</span> of investment within 1 year
        </p>
      </div>
    </div>
  )
}
