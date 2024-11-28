import React from 'react'
import { DiscoverPageWrapper } from '@/components/discover/DiscoverPageWrapper'
import { ComicIssueGrid } from '@/components/discover/ComicIssueGrid'

export default function DiscoverEpisodesPage() {
  return (
    <DiscoverPageWrapper>
      <ComicIssueGrid />
    </DiscoverPageWrapper>
  )
}
