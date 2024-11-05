
import { BaseLayout } from '@/components/layout/BaseLayout'
import { PROJECTS } from '@/constants/projects'
import { cn } from '@/lib/utils'
import { Project } from '@/models/project'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Text } from '@/components/ui'
import { SearchInput } from '@/components/shared/SearchInput'
import React from 'react'
import { ProfileSheet } from '@/components/shared/sheets/profile/ProfileSheet'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { FilterBar } from './components'

type Props = {
  params: { slug: string }
}

export default function DiscoverPage({}: Props) {
  console.log('base discover')
  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full gap-6'>
        <FilterBar />
        <ComicsSection projects={PROJECTS} />
      </div>
    </BaseLayout>
  )
}

type ComicsSectionProps = {
  projects: Project[]
}

const ComicsSection: React.FC<ComicsSectionProps> = ({ projects }) => {
  console.log('comicssection')
  return (
    <div className='grid grid-cols-6 gap-6 '>
      {projects.map((project) => (
        <Link href={project.slug} className='relative h-[295px] rounded-xl hover:brightness-125' key={project.title}>
          <Image alt={project.title + ' Cover'} src={project.cover} className='object-cover rounded-xl' fill />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div className='relative z-10 p-4 flex flex-col gap-2 justify-end h-full'>
            <div className='flex flex-col gap-1 items-start justify-end'>
              <Text as='p' styleVariant='body-small' fontWeight='bold'>
                {project.title}
              </Text>
              <Text as='p' styleVariant='body-xsmall'>
                {project.creator.name}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
