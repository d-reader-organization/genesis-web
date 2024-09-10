import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueFilterTag, ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { Navigation } from '@/components/layout/Navigation'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { ComicList } from '@/components/comic/List'
import { Section } from '@/components/shared/Section'
import { RoutePath } from '@/enums/routePath'
import { fetchComics } from './lib/api/comic/queries'
import { fetchComicIssues } from './lib/api/comicIssue/queries'
import { fetchCreators } from './lib/api/creator/queries'
import { fetchCarouselSlides } from './lib/api/carousel/queries'
import { CarouselCard } from '@/components/ui/carousel/CarouselCard'

const TAKE_COMICS = 18
const TAKE_ISSUES = 18
const TAKE_CREATORS = 8

export default async function HomePage() {
  const carouselSlides: CarouselSlide[] = await fetchCarouselSlides()
  const [promotedComics, popularComics, newComics, newEpisodes, freeEpisodes, topCreators] = await Promise.all([
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Rating }),
    fetchComics({ skip: 0, take: TAKE_COMICS, filterTag: ComicFilterTag.Popular }),
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Published }),
    fetchComicIssues({ skip: 0, take: TAKE_ISSUES, sortTag: ComicIssueSortTag.Latest }),
    fetchComicIssues({
      skip: 0,
      take: TAKE_ISSUES,
      filterTag: ComicIssueFilterTag.Free,
      sortTag: ComicIssueSortTag.Likes,
    }),
    fetchCreators({ skip: 0, take: TAKE_CREATORS }),
  ])

  return (
    <>
      <Navigation />
      <main className='flex flex-col w-full h-full items-center md:mt-10'>
        <div className='max-w-screen-xl w-full flex flex-col md:mb-10 md:p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 carousel-height mb-52 md:mb-10'>
            <HeroCarousel carouselSlides={carouselSlides} />
            <div className='grid grid-cols-2 gap-4 max-md:p-4'>
              <CarouselCard />
              <CarouselCard />
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
      </main>
    </>
  )
}
