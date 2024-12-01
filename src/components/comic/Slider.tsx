import { Comic } from '@/models/comic'
import { SectionSlider } from '../shared/SectionSlider'
import { cn } from '@/lib/utils'
import { LargeComicCard } from './cards/LargeCard'
import { ComicCardType } from '@/lib/types'
import { DefaultComicCard } from './cards/DefaultCard'

type Props = {
  cardType: ComicCardType
  comics: Comic[]
  title: string
}

export const ComicSectionSlider: React.FC<Props> = ({ cardType, comics, title }) => {
  const isLargeCard = cardType === 'large'
  return (
    <SectionSlider title={title}>
      {comics.map((comic, index) =>
        <div
          key={`${cardType}_${comic.slug}`}
          className={cn(
            'flex flex-[0_0_100%] 320:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pr-4 md:pr-6',
            isLargeCard ? '' : 'xs:flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_16.67%]'
          )}
        >
          {isLargeCard ? (
            <LargeComicCard comic={comic} index={index} />
          ) : (
            <DefaultComicCard comic={comic} />
          )}
        </div>
      )}
    </SectionSlider>
  )
}
