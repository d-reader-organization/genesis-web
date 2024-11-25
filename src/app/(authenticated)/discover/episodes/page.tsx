import React from 'react'
import { DiscoverWrapper } from '@/components/discover/DiscoverPageWrapper'
import { ComicIssueGrid } from '@/components/discover/ComicIssueGrid'

export default function DiscoverComicsPage() {
  return (
    <DiscoverWrapper>
      <ComicIssueGrid />
    </DiscoverWrapper>
  )
}
