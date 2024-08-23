import React from 'react'
import Image from 'next/image'
import { ComicPage } from '@/models/comic/comicPage'

type Props = { pages: ComicPage[] }

export const ComicIssuePages: React.FC<Props> = ({ pages }) => {
  return pages.map((page) => (
    <Image
      key={page.image}
      sizes='(max-width: 1200px) 100vw, 1200px'
      width={page.width ?? 600}
      height={page.height ?? 600}
      src={page.image}
      alt={`Page ${page.pageNumber}`}
      style={{ width: '100%', height: 'auto' }}
    />
  ))
}
