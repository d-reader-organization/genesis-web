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
  Mint: (id: string | number) => `/mint/${id}`,
  Comic: (comicSlug: string) => `/comic/${comicSlug}`,
  ComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}`,
  ReadComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}/read`,
  Creator: (creatorSlug: string) => `/creator/${creatorSlug}`,
  PrivacyPolicy: '/privacy-policy',
})
