import { Navigation } from '@/components/layout/Navigation'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { CAROUSEL_QUERY_KEYS } from '@/api/carousel/carouselKeys'

const { CAROUSEL, SLIDES, GET } = CAROUSEL_QUERY_KEYS

async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${CAROUSEL}/${SLIDES}/${GET}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export default async function Home() {
  const carouselSlides: CarouselSlide[] = await getData()
  // const { xl, lg, md, sm, xs } = useBreakpoints()

  // const take = useMemo(() => {
  //   if (xl) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 8 }
  //   else if (lg) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 4 }
  //   else if (md) return { comics: 15, comicsPerPage: 5, comicIssues: 15, comicIssuesPerPage: 5, creators: 4 }
  //   else if (sm) return { comics: 12, comicsPerPage: 4, comicIssues: 12, comicIssuesPerPage: 4, creators: 4 }
  //   else if (xs) return { comics: 12, comicsPerPage: 2, comicIssues: 12, comicIssuesPerPage: 2, creators: 3 }
  //   else return undefined
  // }, [xl, lg, md, sm, xs])

  // if (!take) return null

  return (
    <>
      <Navigation />
      <main className='flex flex-col w-full h-full bg-cover'>
        <HeroCarousel carouselSlides={carouselSlides} />
      </main>
    </>
  )
}
