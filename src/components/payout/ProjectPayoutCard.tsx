import React from 'react'
import { ReceiptText } from 'lucide-react'
import { payoutDetails } from '@/constants/tooltips'
import { formatNumberWithCommas } from '@/utils/numbers'
import { formatPercentage, formatUSD } from '@/utils/numbers'
import { ProjectFunding, ProjectPayout } from '@/models/project'

type Props = {
  payout: ProjectPayout
  raiseGoal: ProjectFunding['raiseGoal']
  numberOfBackers: ProjectFunding['numberOfBackers']
  className: string
}

export const ProjectPayoutCard: React.FC<Props> = ({ payout, raiseGoal, numberOfBackers, className }) => {
  return (
    <div
      className={
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-center shadow md:rounded-xl md:p-5 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[350px] md:h-[550px] md:gap-1 md:pb-4 ' +
        className
      }
    >
      <div className='flex flex-col gap-[14px] w-full'>
        <p className='text-white text-base font-bold leading-snug'>Payout details*</p>
        <div className='h-[8px] rounded-[27px] w-full bg-[#08cc77]'></div>
      </div>

      <div className='flex flex-row md:flex-col w-full max-md:py-1 items-center md:items-start md:gap-1 max-md:hidden md:pt-1'>
        <h2 className='text-[#08cc77] font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tight'>
          ${formatNumberWithCommas(raiseGoal)}
        </h2>
        <p className='text-[#c2c5ce] text-xs font-medium md:text-base md:leading-relaxed max-md:hidden'>
          pledged of ${formatNumberWithCommas(raiseGoal)}
        </p>
      </div>

      <div className='flex w-full md:flex-col items-start gap-3'>
        <PayoutStats
          text='pledged'
          value={formatUSD(raiseGoal)}
          upperTextColor='text-[#08cc77]'
          className='md:hidden'
        />
        <PayoutStats text='backers' value={formatNumberWithCommas(numberOfBackers)} />
        <PayoutStats
          text='return on investment'
          value={formatPercentage(payout.roiPercent)}
          className='max-md:hidden'
        />
        <PayoutStats text='ROI' value={formatPercentage(payout.roiPercent)} className='md:hidden' />
        <PayoutStats text='days for ROI' value={payout.daysForRoi} />
      </div>

      <div>
        <div className='flex flex-row w-full justify-center items-center p-[12px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl gap-[14px] md:max-h-[104px]'>
          <div
            className='flex max-h-[54px] max-w-[54px] p-[8px] bg-white rounded-xl shadow border border-[#56a05e]'
            style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
          >
            <ReceiptText color='green' size={20} />
          </div>
          <p className='text-[#aeaeae] text-[14px] font-medium leading-snug'>Licencing Participation Agreement</p>
        </div>
        <p className='text-[10px] font-[cursive] md:text-[10px] pt-1 font-base leading-normal md:leading-[22.4px] max-md:pl-1 md:px-2'>
          {payoutDetails}
        </p>
      </div>
    </div>
  )
}

type PayoutStatsProps = {
  text: string
  value: number | string
  upperTextColor?: string
  className?: string
}

const PayoutStats: React.FC<PayoutStatsProps> = ({ text, value, upperTextColor = '', className = '' }) => {
  return (
    <div className={'flex w-1/4 flex-col items-center md:w-full md:items-start ' + className}>
      <h2
        className={
          'font-semibold text-xl leading-tight tracking-tight md:text-[29px] md:leading-none ' + upperTextColor
        }
      >
        {value}
      </h2>
      <p className='text-[#c2c5ce] text-xs font-medium leading-normal md:text-[13px] md:leading-relaxed'>{text}</p>
    </div>
  )
}
