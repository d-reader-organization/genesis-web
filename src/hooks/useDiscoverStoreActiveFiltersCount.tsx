import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider';
import { RoutePath } from '@/enums/routePath';

export const useDiscoverStoreActiveFiltersCount = (): number => {
  const comicParams = useDiscoverFilterStore((state) => state.comicParams);
  const comicIssueParams = useDiscoverFilterStore((state) => state.comicIssueParams);
  const creatorParams = useDiscoverFilterStore((state) => state.creatorParams);
  const pathname = usePathname();

  const activeFiltersCount = useMemo(() => {
    switch (true) {
      case pathname.includes(RoutePath.DiscoverComics): {
        const { genreSlugs, filterTag, sortTag } = comicParams;
        return (genreSlugs?.length || 0) + (filterTag ? 1 : 0) + (sortTag ? 1 : 0);
      }
      case pathname.includes(RoutePath.DiscoverComicIssues): {
        const { genreSlugs, filterTag, sortTag } = comicIssueParams;
        return (genreSlugs?.length || 0) + (filterTag ? 1 : 0) + (sortTag ? 1 : 0);
      }
      case pathname.includes(RoutePath.DiscoverCreators): {
        const { genreSlugs, filterTag, sortTag } = creatorParams;
        return (genreSlugs?.length || 0) + (filterTag ? 1 : 0) + (sortTag ? 1 : 0);
      }
      default:
        return 0;
    }
  }, [pathname, comicParams, comicIssueParams, creatorParams]);

  return activeFiltersCount;
};
