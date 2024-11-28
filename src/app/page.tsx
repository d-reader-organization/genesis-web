import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { fetchComics } from './lib/api/comic/queries'
import { fetchCarouselSlides } from './lib/api/carousel/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { ComicSectionSlider } from '@/components/comic/Slider'

const TAKE_COMICS = 18
const TAKE_TOP_PICKS = 10

export default async function HomePage() {
  const carouselSlides: CarouselSlide[] = await fetchCarouselSlides()
  const [topPickComics, popularComics] = await Promise.all([
    fetchComics({ skip: 0, take: TAKE_TOP_PICKS, sortTag: ComicSortTag.Rating }),
    fetchComics({ skip: 0, take: TAKE_COMICS, filterTag: ComicFilterTag.Popular }),
  ])

  return (
    <BaseLayout mainClassName='p-0 md:p-0 lg:p-0' showFooter>
      <div className='flex justify-center items-center size-full overflow-hidden'>
        <HeroCarousel slides={carouselSlides} />
      </div>
      <div className='w-full flex flex-col items-center gap-10'>
        <div className='flex flex-col gap-8 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl max-sm:px-2 py-4 md:py-6 lg:py-8'>
          <div className='flex flex-col'>
            <h1 className='text-32 md:text-64 lg:text-[120px] text-white md:text-grey-400 font-obviouslyNarrow font-semibold leading-1/2 tracking-024 uppercase relative top-8 md:top-[66px] lg:top-[68px] w-fit'>
              Top 10 picks
            </h1>
            <ComicSectionSlider cardType='large' comics={topPickComics} title='' />
          </div>
          <ComicSectionSlider cardType='default' comics={popularComics} title='Featured Comic Series' />
        </div>
      </div>
    </BaseLayout>
  )
}
