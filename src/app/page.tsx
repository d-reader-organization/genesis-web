import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { ComicList } from '@/components/comic/List'
import { Section } from '@/components/shared/Section'
import { RoutePath } from '@/enums/routePath'
import { fetchComics } from './lib/api/comic/queries'
import { fetchCarouselSlides } from './lib/api/carousel/queries'
import { CarouselCard } from '@/components/ui/carousel/CarouselCard'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CarouselLocation } from '@/enums/carouselLocation'

const TAKE_COMICS = 18

export default async function HomePage() {
  const carouselSlides: CarouselSlide[] = await fetchCarouselSlides()
  const [promotedComics, popularComics, newComics] = await Promise.all([
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Rating }),
    fetchComics({ skip: 0, take: TAKE_COMICS, filterTag: ComicFilterTag.Popular }),
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Published }),
  ])
  const primarySlides = carouselSlides.filter((slide) => slide.location === CarouselLocation.HomePrimary).slice(0, 5)
  const secondarySlides = carouselSlides
    .filter((slide) => slide.location === CarouselLocation.HomeSecondary)
    .slice(0, 2)
  return (
    <BaseLayout>
      <div className='max-w-screen-xl w-full flex flex-col md:mb-10 md:p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 carousel-height mb-52 md:mb-10'>
          <HeroCarousel slides={primarySlides} />
          <div className='grid grid-cols-2 gap-4 max-md:p-4'>
            {secondarySlides.map((slide) => (
              <CarouselCard key={slide.id} slide={slide} />
            ))}
          </div>
        </div>
        <div className='mx-4 flex flex-col gap-8'>
          <Section actionHref={RoutePath.DiscoverComics} title='Top 10 trending'>
            <ComicList comics={promotedComics} />
          </Section>

          <Section actionHref={RoutePath.DiscoverComics} title='Popular comics'>
            <ComicList comics={popularComics} />
          </Section>

          <Section actionHref={RoutePath.DiscoverComics} title='New comics'>
            <ComicList comics={newComics} />
          </Section>
        </div>
      </div>
    </BaseLayout>
  )
}
