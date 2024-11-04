export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SliderType {
  comicList,
  comicIssueList,
}

export enum Role {
  Superadmin = 'Superadmin',
  Admin = 'Admin',
  User = 'User',
  Tester = 'Tester',
}

export enum GlobalStatusType {
  Success = 'Success',
  Info = 'Info',
  Warning = 'Warning',
  Maintenance = 'Maintenance',
}

export enum AudienceType {
  Everyone = 'Everyone',
  Teen = 'Teen',
  TeenPlus = 'TeenPlus',
  Mature = 'Mature',
}

export enum CarouselLocation {
  HomePrimary = 'HomePrimary',
  HomeSecondary = 'HomeSecondary',
}

export enum CollaboratorRole {
  Advisor = 'Advisor',
  Artist = 'Artist',
  CoWriter = 'CoWriter',
  Colorist = 'Colorist',
  CoverArtist = 'CoverArtist',
  CreativeDirector = 'CreativeDirector',
  Editor = 'Editor',
  Illustrator = 'Illustrator',
  Inker = 'Inker',
  Letterer = 'Letterer',
  Penciler = 'Penciler',
  Translator = 'Translator',
  Writer = 'Writer',
}

export enum ComicRarity {
  None = 'None',
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export const RoutePath = Object.freeze({
  Home: '/',
  Welcome: '/welcome',
  Profile: '/profile',
  Login: '/login',
  Register: '/register',
  RegisterEmailVerification: '/register/email-verification',
  RegisterConnectWallet: '/register/connect-wallet',
  Discover: '/discover',
  DiscoverComics: '/discover/comics',
  DiscoverComicIssues: '/discover/comic-issues',
  DiscoverCreators: '/discover/creators',
  Library: '/library',
  OwnedAssets: (slug: string) => `/library/${slug}`,
  Mint: (id: string | number) => `/mint/${id}`,
  Claim: (id: string | number) => `/claim/${id}`,
  Comic: (comicSlug: string) => `/comic/${comicSlug}`,
  ComicRead: (comicSlug: string) => `/comic/${comicSlug}/read`,
  ComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}`,
  ReadComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}/read`,
  Creator: (creatorSlug: string) => `/creator/${creatorSlug}`,
  PrivacyPolicy: '/privacy-policy',
  Invest: '/invest',
  InvestDetails: (slug: string) => `/invest/${slug}`,
  Payout: (slug: string) => `/payout/${slug}`,
})
