import { ComicPage } from '@/models/comic/comicPage'
import Link from 'next/link'
import React from 'react'

type Props = {
  pages: ComicPage[]
}

export const PagesPreview: React.FC<Props> = ({ pages }) => {
  return <Link href='/e-reader?'>Pages preview {pages.length}</Link>
}
