export interface ComicIssueMyStats {
	rating: number | null
	isFavourite: boolean
	// isSubscribed: boolean
	viewedAt: Date | null
	readAt: Date | null
	canRead?: boolean
}
