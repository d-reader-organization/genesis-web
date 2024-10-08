import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { fetchComics } from './lib/api/comic/queries'
import { fetchCarouselSlides } from './lib/api/carousel/queries'
import { CarouselCard } from '@/components/ui/carousel/CarouselCard'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CarouselLocation } from '@/enums/carouselLocation'
import { ComicSectionSlider } from '@/components/comic/Slider'

const TAKE_COMICS = 18
const TAKE_TOP_PICKS = 10

export default async function HomePage() {
  const carouselSlides: CarouselSlide[] = await fetchCarouselSlides()
  const [topPickComics, popularComics] = await Promise.all([
    fetchComics({ skip: 0, take: TAKE_TOP_PICKS, sortTag: ComicSortTag.Rating }),
    fetchComics({ skip: 0, take: TAKE_COMICS, filterTag: ComicFilterTag.Popular }),
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
          <ComicSectionSlider cardType='large' comics={topPickComics} title='Top 10 picks' />
          <ComicSectionSlider cardType='normal' comics={popularComics} title='Featured Comic Serials' />
        </div>
      </div>
    </BaseLayout>
  )
}
