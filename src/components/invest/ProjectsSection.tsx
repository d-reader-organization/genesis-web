import { SuccessfulProject } from '@/models/project'
import { RoutePath } from '@/enums/routePath'
import { ChevronRightIcon, InfoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'
import { roiTooltip } from '@/constants/tooltips'
import { formatUSD } from '@/utils/numbers'
import { Text } from '../ui'

type Props = {
  projects: SuccessfulProject[]
  title: string
}

export const ProjectsSection: React.FC<Props> = ({ projects, title }) => {
  return (
    <div className='flex flex-col gap-4 md:gap-10 md:my-10'>
      <Text as='h3' styleVariant='primary'>
        {title}
      </Text>
      <div className='max-md:py-2 flex 1160::grid overflow-x-auto 1160:overflow-x-visible grid-cols-4 gap-4 md:gap-6 lg:gap-10'>
        {projects.map((project) => (
          <Card project={project} key={project.slug} />
        ))}
      </div>
    </div>
  )
}

type CardProps = {
  project: SuccessfulProject
}

const Card: React.FC<CardProps> = ({ project }) => (
  <div className='bg-grey-500 flex flex-col items-center gap-4 md:gap-[30px] p-4 md:p-6 pt-4 rounded-xl max-w-[242px] md:max-w-[354px]'>
    <div className='flex items-center max-h-[84px] h-full'>
      <Image
        alt={`logo-${project.logo}`}
        src={project.logo}
        className='max-w-[180px] max-h-[84px] object-cover p-1'
        width={180}
        height={84}
      />
    </div>
    <RoiWidget roi={project.payout.roiPercent} tooltipText={roiTooltip(project.payout.roiPercent)} />
    <div className='flex max-md:flex-col justify-center gap-4 md:gap-12 lg:gap-16 xl:gap-20 items-center'>
      <InvestmentStatsBox title='RAISED' value={formatUSD(project.funding.raiseGoal)} />
      <InvestmentStatsBox title='BACKERS' value={project.funding.numberOfBackers} />
    </div>
    <p className='text-xs md:text-base font-bold leading-normal md:leading-[22.4px] text-center'>
      Payout processed {project.payout?.daysForRoi} days after the offering closed.
    </p>
    <Link
      href={RoutePath.Payout(project.slug)}
      className='flex justify-center items-center gap-2 self-stretch text-[#AFB3BC] rounded-xl bg-grey-400 py-3 pr-2 pl-4 hover:brightness-125 max-h-[36px] md:max-h-[42px]'
    >
      <p className='text-xs md:text-base font-medium leading-normal md:leading-[22.4px]'>Learn more</p>
      <ChevronRightIcon />
    </Link>
  </div>
)

const RoiWidget: React.FC<{ roi: number; tooltipText: string }> = ({ roi, tooltipText }) => (
  <div className='flex max-md:flex-col justify-center items-center p-3 gap-2 md:gap-3 bg-grey-600 rounded-xl max-h-[60px] md:max-h-12 max-w-[240px]'>
    <p className='text-base md:text-[32px] font-bold leading:[22.4px] md:leading-8'>{roi}%</p>
    <div className='flex items-center gap-2 md:gap-3'>
      <p className='text-[10px] md:text-xs font-bold leading-normal text-grey-100'>RETURN ON INVESTMENT</p>
      <InfoTooltip text={tooltipText} />
    </div>
  </div>
)

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip delayDuration={10}>
      <TooltipTrigger>
        <InfoIcon className='text-green-genesis size-[10px] md:size-[18px]' />
      </TooltipTrigger>
      <TooltipContent align='start' className='max-w-80' side='right'>
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

type InvestmentStatsBoxProps = {
  title: string
  value: string | number
}

const InvestmentStatsBox: React.FC<InvestmentStatsBoxProps> = ({ title, value }) => (
  <div className='flex flex-col justify-center items-center'>
    <p className='text-xs font-bold text-grey-100'>{title}</p>
    <p className='text-base font-bold leading-[22.4px]'>{value}</p>
  </div>
)
