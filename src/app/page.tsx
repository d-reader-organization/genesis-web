import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueFilterTag, ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { Navigation } from '@/components/layout/Navigation'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { ComicList } from '@/components/comic/ComicList'
import { ComicIssueList } from '@/components/comicIssue/ComicIssueList'
import { CreatorList } from '@/components/creator/CreatorList'
import { Section } from '@/components/shared/Section'
import { RoutePath } from '@/enums/routePath'
import { fetchComics } from './lib/api/comic/queries'
import { fetchComicIssues } from './lib/api/comicIssue/queries'
import { fetchCreators } from './lib/api/creator/queries'
import { fetchCarouselSlides } from './lib/api/carousel/queries'

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
      <main className='flex flex-col w-full h-full items-center'>
        <HeroCarousel carouselSlides={carouselSlides} />
        <div className='max-w-screen-xl w-full flex flex-col md:mb-10'>
          <Section
            id='promoted-comics'
            title='Get started'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={promotedComics} />
          </Section>

          <Section
            id='popular-comics'
            title='Popular comics'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={popularComics} />
          </Section>

          <Section
            id='new-episodes'
            title='New episodes'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComicIssues }}
          >
            <ComicIssueList comicIssues={newEpisodes} />
          </Section>

          <Section
            id='free-comic-issues'
            title='Free episodes'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComicIssues }}
          >
            <ComicIssueList comicIssues={freeEpisodes} />
          </Section>

          <Section
            id='top-creators'
            title='Top creators'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverCreators }}
          >
            <CreatorList creators={topCreators} animate={false} />
          </Section>

          <Section
            id='new-comics'
            title='New comics'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={newComics} />
          </Section>
        </div>
      </main>
    </>
  )
}
