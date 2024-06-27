'use client'

import { Navigation } from '@/components/layout/Navigation'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { useMemo } from 'react'

export default function Home() {
  const { xl, lg, md, sm, xs } = useBreakpoints()

  const take = useMemo(() => {
    if (xl) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 8 }
    else if (lg) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 4 }
    else if (md) return { comics: 15, comicsPerPage: 5, comicIssues: 15, comicIssuesPerPage: 5, creators: 4 }
    else if (sm) return { comics: 12, comicsPerPage: 4, comicIssues: 12, comicIssuesPerPage: 4, creators: 4 }
    else if (xs) return { comics: 12, comicsPerPage: 2, comicIssues: 12, comicIssuesPerPage: 2, creators: 3 }
    else return undefined
  }, [xl, lg, md, sm, xs])

  if (!take) return null

  return (
    <>
      <Navigation />
      <main className='flex bg-grey-600 min-h-screen flex-col items-center justify-between p-24 bg'>
        <div className='flex items-center justify-center h-[80vh]'>
          <p className='font-bold text-2xl tracking-wider'>dReader-web</p>
        </div>
      </main>
    </>
  )
}
