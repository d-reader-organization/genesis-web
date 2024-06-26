export interface ComicPage {
	id: number
	pageNumber: number
	isPreviewable: boolean
	image: string
	height: number
	width: number
}

export type CreateComicPageData = Pick<ComicPage, 'pageNumber' | 'isPreviewable' | 'image'>
