import { Comic } from '@/models/comic'
import { SectionSlider } from '../shared/SectionSlider'
import { ComicCardV2 } from './CardV2'
import { cn } from '@/lib/utils'

type Props = {
  cardType: 'large' | 'normal'
  comics: Comic[]
  title: string
}

export const ComicSectionSlider: React.FC<Props> = ({ cardType, comics, title }) => {
  return (
    <SectionSlider title={title}>
      {comics.map((comic, index) => (
        <div
          key={`${cardType}_${comic.slug}`}
          className={cn('flex flex-[0_0_25%] min-w-0 pl-6', cardType === 'normal' ? 'lg:flex-[0_0_16.67%]' : '')}
        >
          <ComicCardV2 cardSize={cardType} comic={comic} index={index} />
        </div>
      ))}
    </SectionSlider>
  )
}
