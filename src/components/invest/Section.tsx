import { Project } from '@/app/lib/data/invest/projectsData'
import { RoutePath } from '@/enums/routePath'
import { ChevronRightIcon, InfoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'

type Props = {
  projects: Project[]
  title: string
}

export const InvestSection: React.FC<Props> = ({ projects, title }) => {
  return (
    <div className='flex flex-col max-h-[414px] gap-10'>
      <h1 className='text-[32px] font-semibold leading-8 tracking-[0.064px]'>{title}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-10'>
        {projects.map((project) => (
          <Card project={project} key={project.slug} />
        ))}
      </div>
    </div>
  )
}

type CardProps = {
  project: Project
}

const Card: React.FC<CardProps> = ({ project }) => (
  <div className='bg-grey-500 flex flex-col items-center gap-[30px] p-6 pt-8 rounded-xl mb-20'>
    <Image
      alt={`logo-${project.logo}`}
      src={project.logo}
      className='max-w-[180px] max-h-[84px] object-cover p-4'
      width={180}
      height={180}
    />
    <RoiWidget roi={project.roi} tooltipText={project.tooltipText} />
    <div className='flex justify-center gap-12  lg:gap-16 xl:gap-20 items-center'>
      <div className='flex flex-col gap-2'>
        <p className='text-xs font-bold text-grey-100'>RAISED</p>
        <p className='text-base font-bold leading-[22.4px]'>${project.raised}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-xs font-bold text-grey-100'>BACKERS</p>
        <p className='text-base font-bold leading-[22.4px]'>{project.backers}</p>
      </div>
    </div>
    <p className='text-base font-bold leading-[22.4px] text-center'>{project.description}</p>
    <Link
      href={RoutePath.Payout(project.slug)}
      className='flex justify-center items-center gap-2 self-stretch text-[#AFB3BC] rounded-xl bg-grey-400 py-3 pr-2 pl-4 hover:brightness-125'
    >
      <p>Learn more</p>
      <ChevronRightIcon />
    </Link>
  </div>
)

const RoiWidget: React.FC<{ roi: number; tooltipText: string }> = ({ roi, tooltipText }) => (
  <div className='flex justify-center items-center p-3 gap-3 bg-grey-600 rounded-xl'>
    <p className='text-[32px] font-bold leading-8'>{roi}%</p>
    <p className='text-xs font-bold leading-normal text-grey-100'>RETURN ON INVESTMENT</p>
    <InfoTooltip text={tooltipText} />
  </div>
)

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip delayDuration={10}>
      <TooltipTrigger>
        <InfoIcon className='text-green-genesis size-[18px]' />
      </TooltipTrigger>
      <TooltipContent side='right'>{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
