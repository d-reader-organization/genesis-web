import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueSortTag, ComicIssueFilterTag } from '@/models/comicIssue/comicIssueParams'
import { CreatorSortTag, CreatorFilterTag } from '@/models/creator/creatorParams'
import { DiscoverFilterStore } from '@/stores/DiscoverFilterStore'

export type DiscoverQueryCriteria<E extends Record<string, string>> = {
  label: string
  tags: E
  getSelected: (store: DiscoverFilterStore) => E[keyof E] | undefined
  updateFunction: (store: DiscoverFilterStore, tag: E[keyof E] | undefined) => void
}

function createDiscoverSearchCriteria<E extends Record<string, string>>(
  label: string,
  tags: E,
  getSelected: (store: DiscoverFilterStore) => E[keyof E] | undefined,
  updateFunction: (store: DiscoverFilterStore, tag: E[keyof E] | undefined) => void
): DiscoverQueryCriteria<E> {
  return { label, tags, getSelected, updateFunction }
}

export type ALL_DISCOVER_QUERY_CRITERIAS =
  | DiscoverQueryCriteria<typeof ComicFilterTag>
  | DiscoverQueryCriteria<typeof ComicSortTag>
  | DiscoverQueryCriteria<typeof ComicIssueFilterTag>
  | DiscoverQueryCriteria<typeof ComicIssueSortTag>
  | DiscoverQueryCriteria<typeof CreatorFilterTag>
  | DiscoverQueryCriteria<typeof CreatorSortTag>

export const COMICS_FILTER_CRITERIA = createDiscoverSearchCriteria(
  'Most Wanted',
  ComicFilterTag,
  (store) => store.comicParams.filterTag,
  (store, tag) => store.updateComicParams({ filterTag: tag })
)

export const COMICS_SORT_CRITERIA = createDiscoverSearchCriteria(
  'Engagement',
  ComicSortTag,
  (store) => store.comicParams.sortTag,
  (store, tag) => store.updateComicParams({ sortTag: tag })
)

export const COMIC_ISSUES_FILTER_CRITERIA = createDiscoverSearchCriteria(
  'Most Wanted',
  ComicIssueFilterTag,
  (store) => store.comicIssueParams.filterTag,
  (store, tag) => store.updateComicIssueParams({ filterTag: tag })
)

export const COMIC_ISSUES_SORT_CRITERIA = createDiscoverSearchCriteria(
  'Engagement',
  ComicIssueSortTag,
  (store) => store.comicIssueParams.sortTag,
  (store, tag) => store.updateComicIssueParams({ sortTag: tag })
)

export const CREATORS_FILTER_CRITERIA = createDiscoverSearchCriteria(
  'Most Wanted',
  CreatorFilterTag,
  (store) => store.creatorParams.filterTag,
  (store, tag) => store.updateCreatorParams({ filterTag: tag })
)

export const CREATORS_SORT_CRITERIA = createDiscoverSearchCriteria(
  'Engagement',
  CreatorSortTag,
  (store) => store.creatorParams.sortTag,
  (store, tag) => store.updateCreatorParams({ sortTag: tag })
)
