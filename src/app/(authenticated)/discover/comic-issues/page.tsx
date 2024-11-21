import React from 'react'
import { DiscoverWrapper } from '@/components/discover/DiscoverPageWrapper'
import { ComicIssuesContent } from '@/components/discover/ComicIssueGrid'

export default function DiscoverComicsPage() {
  return (
    <DiscoverWrapper>
      <ComicIssuesContent />
    </DiscoverWrapper>
  )
}
