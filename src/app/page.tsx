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
    <BaseLayout showFooter>
      <div className='max-w-screen-xl w-full flex flex-col gap-10 md:p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HeroCarousel slides={primarySlides} />
          <div className='max-sm:hidden flex flex-row md:flex-col xl:flex-row gap-4 max-md:p-4 max-h-80 md:max-h-[511px] h-full overflow-hidden'>
            {secondarySlides.map((slide) => (
              <CarouselCard key={slide.id} slide={slide} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col'>
            <h1 className='text-32 md:text-64 lg:text-[120px] text-white md:text-grey-400 font-obviouslyNarrow font-semibold leading-1/2 tracking-024 uppercase relative top-8 md:top-[66px] lg:top-[68px] w-fit'>
              Top 10 picks
            </h1>
            <ComicSectionSlider cardType='large' comics={topPickComics} title='' />
          </div>
          <ComicSectionSlider cardType='default' comics={popularComics} title='Featured Comic Serials' />
        </div>
      </div>
    </BaseLayout>
  )
}
