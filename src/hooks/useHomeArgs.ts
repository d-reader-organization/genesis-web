import { useMemo } from 'react'
import { useBreakpoints } from './useBreakpoints'

type ReturnType = {
  comics: number
  comicsPerPage: number
  comicIssues: number
  comicIssuesPerPage: number
  creators: number
}

export function useHomeArgs(): ReturnType | undefined {
  const { xl, lg, md, sm, xs } = useBreakpoints()
  const take = useMemo(() => {
    if (xl) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 8 }
    else if (lg) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 4 }
    else if (md) return { comics: 15, comicsPerPage: 5, comicIssues: 15, comicIssuesPerPage: 5, creators: 4 }
    else if (sm) return { comics: 12, comicsPerPage: 4, comicIssues: 12, comicIssuesPerPage: 4, creators: 4 }
    else if (xs) return { comics: 12, comicsPerPage: 2, comicIssues: 12, comicIssuesPerPage: 2, creators: 3 }
    else return undefined
  }, [xl, lg, md, sm, xs])

  return take
}
