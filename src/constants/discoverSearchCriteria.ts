import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueSortTag, ComicIssueFilterTag } from '@/models/comicIssue/comicIssueParams'
import { CreatorSortTag, CreatorFilterTag } from '@/models/creator/creatorParams'
import { DiscoverFilterStore } from '@/stores/DiscoverFilterStore'

export type DiscoverSearchCriteria<E extends Record<string, string>> = {
  label: string
  tags: E
  updateFunction: (store: DiscoverFilterStore, tag: E[keyof E] | undefined) => void
}

function createDiscoverSearchCriteria<E extends Record<string, string>>(
  label: string,
  tags: E,
  updateFunction: (store: DiscoverFilterStore, tag: E[keyof E] | undefined) => void
): DiscoverSearchCriteria<E> {
  return { label, tags, updateFunction }
}

export type ALL_DISCOVER_SEARCH_CRITERIAS =
  | DiscoverSearchCriteria<typeof ComicFilterTag>
  | DiscoverSearchCriteria<typeof ComicSortTag>
  | DiscoverSearchCriteria<typeof ComicIssueFilterTag>
  | DiscoverSearchCriteria<typeof ComicIssueSortTag>
  | DiscoverSearchCriteria<typeof CreatorFilterTag>
  | DiscoverSearchCriteria<typeof CreatorSortTag>

export const COMIC_FILTER_CRITERIA = createDiscoverSearchCriteria('Most Wanted', ComicFilterTag, (store, tag) =>
  store.updateComicParams({ filterTag: tag })
)

export const COMIC_SORT_CRITERIA = createDiscoverSearchCriteria('Engagement', ComicSortTag, (store, tag) =>
  store.updateComicParams({ sortTag: tag })
)

export const COMIC_ISSUE_FILTER_CRITERIA = createDiscoverSearchCriteria(
  'Most Wanted',
  ComicIssueFilterTag,
  (store, tag) => store.updateComicIssueParams({ filterTag: tag })
)

export const COMIC_ISSUE_SORT_CRITERIA = createDiscoverSearchCriteria('Engagement', ComicIssueSortTag, (store, tag) =>
  store.updateComicIssueParams({ sortTag: tag })
)

export const CREATOR_FILTER_CRITERIA = createDiscoverSearchCriteria('Most Wanted', CreatorFilterTag, (store, tag) =>
  store.updateCreatorParams({ filterTag: tag })
)

export const CREATOR_SORT_CRITERIA = createDiscoverSearchCriteria('Engagement', CreatorSortTag, (store, tag) =>
  store.updateCreatorParams({ sortTag: tag })
)
