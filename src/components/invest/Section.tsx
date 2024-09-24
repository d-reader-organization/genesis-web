import { InterestProject } from '@/app/lib/data/invest/projectsData'
import React from 'react'
import { Section } from '../shared/Section'
import Image from 'next/image'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import AnnouncementIcon from 'public/assets/vector-icons/announcement.svg'
import { cn } from '@/lib/utils'

type Props = {
  actionHref: string
  data: InterestProject[]
  title: string
}

export const InvestSection: React.FC<Props> = ({ actionHref, data, title }) => {
  return (
    <Section actionHref={actionHref} title={title}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 '>
        {data.map((project) => (
          <Link
            href={RoutePath.InvestDetails(project.slug)}
            className='relative  max-h-[382px] min-h-[382px] rounded-xl hover:brightness-125'
            key={project.title}
          >
            <Image
              alt={`Background image of the project - ${project.title}`}
              src={project.image}
              className='object-cover rounded-xl'
              fill
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
            <div className='relative z-10 p-6 flex flex-col gap-2 justify-end h-full'>
              <h2 className='text-xl md:text-2xl font-semibold md:font-bold leading-[20px] md:leading-[24px] max-md:tracking-[0.04px]'>
                {project.title}
              </h2>
              <div className='inline-flex items-center gap-2'>
                <AnnouncementIcon />
                <div className='flex max-md:flex-col md:items-center gap-1'>
                  <p className='text-base max-md:leading-[16px] md:text-2xl font-bold'>{project.stats.likes}</p>
                  <p className='text-[10px] md:text-xs font-bold text-grey-100'>PEOPLE EXPRESSED INTEREST</p>
                </div>
              </div>
              <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag, index) => (
                  <div
                    className={cn(
                      'flex justify-center items-center h-[28px] p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-[25px]',
                      index === 0 && 'bg-transparent border border-grey-100'
                    )}
                    key={`${tag}-${index}`}
                  >
                    <p className='text-[10px] leading-normal md:text-base font-medium text-grey-100'>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
