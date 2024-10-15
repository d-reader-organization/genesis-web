import { cn } from '@/lib/utils'
import { AvatarImage } from '@/components/shared/AvatarImage'

type ProjectCreatorSectionProps = {
  creator: {
    name: string
    avatar: string
  }
  tags: string[]
}

export const ProjectCreatorSection: React.FC<ProjectCreatorSectionProps> = ({ creator, tags }) => {
  return (
    <section className='flex flex-col w-full justify-between gap-3 py-4 md:items-center md:flex-row md:py-8 md:gap-10'>
      <div className='flex items-center gap-2'>
        <AvatarImage src={creator.avatar} size={42} alt={creator + ' Avatar'} className='' />
        <span className='text-white text-base font-bold leading-snug'>{creator.name}</span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
          <div
            className={cn(
              'flex justify-center items-center h-[24px] md:h-[28px] p-2 rounded-lg bg-white bg-opacity-20 md:backdrop-blur-[25px]',
              index === 0 && 'bg-transparent border border-grey-100'
            )}
            key={`${tag}-${index}`}
          >
            <p className='text-[10px] leading-normal font-base md:text-base md:font-medium text-grey-100'>{tag}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
