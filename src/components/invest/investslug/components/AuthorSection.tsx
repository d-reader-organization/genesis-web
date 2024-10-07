'use client'
import { cn } from '@/lib/utils'
import { AvatarImage } from '@/components/shared/AvatarImage'

interface AuthorSectionProps {
  author: string
  imageURL: string
  tags: string[]
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({ author, imageURL, tags }) => {
  return (
    <section className='w-full py-2 md:py-8 flex flex-row gap-4 md:gap-10 justify-between items-center'>
      <div className='flex items-center gap-2'>
        <AvatarImage src={imageURL} size={42} alt='Author Avatar' className='' />
        <div className="text-white text-base font-bold font-['Satoshi'] leading-snug">{author}</div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
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
    </section>
  )
}
