import { RoutePath } from '@/enums/routePath'
import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueSortTag, ComicIssueFilterTag } from '@/models/comicIssue/comicIssueParams'
import { CreatorSortTag, CreatorFilterTag } from '@/models/creator/creatorParams'
import { DiscoverQueryStore } from '@/stores/DiscoverQueryStore'

export type DiscoverPageQueryCriteria<E extends Record<string, string>> = {
  label: string
  tags: E
  getSelectedTags: (store: DiscoverQueryStore) => E[keyof E] | undefined
  updateSelectedTags: (store: DiscoverQueryStore, tag: E[keyof E] | undefined) => void
}

function createDiscoverPageQueryCriteria<E extends Record<string, string>>(
  label: string,
  tags: E,
  getSelectedTags: (store: DiscoverQueryStore) => E[keyof E] | undefined,
  updateSelectedTags: (store: DiscoverQueryStore, tag: E[keyof E] | undefined) => void
): DiscoverPageQueryCriteria<E> {
  return { label, tags, getSelectedTags, updateSelectedTags }
}

export type ALL_DISCOVER_PAGE_QUERY_CRITERIAS =
  | DiscoverPageQueryCriteria<typeof ComicFilterTag>
  | DiscoverPageQueryCriteria<typeof ComicSortTag>
  | DiscoverPageQueryCriteria<typeof ComicIssueFilterTag>
  | DiscoverPageQueryCriteria<typeof ComicIssueSortTag>
  | DiscoverPageQueryCriteria<typeof CreatorFilterTag>
  | DiscoverPageQueryCriteria<typeof CreatorSortTag>

// criterias
export const COMICS_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Most Wanted',
  ComicFilterTag,
  (store) => store.comicParams.filterTag,
  (store, tag) => store.updateComicParams({ filterTag: tag })
)

export const COMICS_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Engagement',
  ComicSortTag,
  (store) => store.comicParams.sortTag,
  (store, tag) => store.updateComicParams({ sortTag: tag })
)

export const COMIC_ISSUES_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Most Wanted',
  ComicIssueFilterTag,
  (store) => store.comicIssueParams.filterTag,
  (store, tag) => store.updateComicIssueParams({ filterTag: tag })
)

export const COMIC_ISSUES_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Engagement',
  ComicIssueSortTag,
  (store) => store.comicIssueParams.sortTag,
  (store, tag) => store.updateComicIssueParams({ sortTag: tag })
)

export const CREATORS_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Most Wanted',
  CreatorFilterTag,
  (store) => store.creatorParams.filterTag,
  (store, tag) => store.updateCreatorParams({ filterTag: tag })
)

export const CREATORS_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Engagement',
  CreatorSortTag,
  (store) => store.creatorParams.sortTag,
  (store, tag) => store.updateCreatorParams({ sortTag: tag })
)

// criteria arrays
export const QUERY_COMIC_CRITERIAS = [
  { label: 'Comics Filter', criteria: COMICS_FILTER_CRITERIA },
  { label: 'Comics Sort', criteria: COMICS_SORT_CRITERIA },
];

export const QUERY_COMIC_ISSUE_CRITERIAS = [
  { label: 'Comic Issues Filter', criteria: COMIC_ISSUES_FILTER_CRITERIA },
  { label: 'Comic Issues Sort', criteria: COMIC_ISSUES_SORT_CRITERIA },
];

export const QUERY_CREATOR_CRITERIAS = [
  { label: 'Creators Filter', criteria: CREATORS_FILTER_CRITERIA },
  { label: 'Creators Sort', criteria: CREATORS_SORT_CRITERIA },
];

// query criteria map
export const QUERY_CRITERIA_MAP = {
  [RoutePath.DiscoverComics]: QUERY_COMIC_CRITERIAS,
  [RoutePath.DiscoverComicIssues]: QUERY_COMIC_ISSUE_CRITERIAS,
  [RoutePath.DiscoverCreators]: QUERY_CREATOR_CRITERIAS,
};