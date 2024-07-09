import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { fetchWrapper } from '../../fetchWrapper'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'

const { COMIC_ISSUE, GET } = COMIC_ISSUE_QUERY_KEYS

export const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const response = await fetchWrapper({
    params,
    path: `${COMIC_ISSUE}/${GET}`,
  })
  return response.json()
}
