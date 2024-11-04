import { Comic } from '@/models/comic'
import { SectionSlider } from '../shared/SectionSlider'
import { cn } from '@/utils/general'
import { LargeComicCard } from './cards/LargeCard'
import { RoutePath } from '@/utils/enums'
import { DefaultComicCard } from './cards/DefaultCard'

type Props = {
  cardType: ComicCardType
  comics: Comic[]
  title: string
}

type ComicCardType = 'large' | 'default'

export const ComicSectionSlider: React.FC<Props> = ({ cardType, comics, title }) => {
  return (
    <SectionSlider title={title}>
      {comics.map((comic, index) => {
        const href = RoutePath.Comic(comic.slug)
        return (
          <div
            key={`${cardType}_${comic.slug}`}
            className={cn(
              'flex flex-[0_0_50%] md:flex-[0_0_25%] min-w-0 pr-4 md:pr-6',
              cardType === 'large' ? '' : 'sm:flex-[0_0_25%] lg:flex-[0_0_16.67%]'
            )}
          >
            {cardType === 'large' ? (
              <LargeComicCard comic={comic} index={index} href={href} />
            ) : (
              <DefaultComicCard comic={comic} href={href} />
            )}
          </div>
        )
      })}
    </SectionSlider>
  )
}
