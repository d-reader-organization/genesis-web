import { ComicIssuePageParams } from '@/models/common'
import React from 'react'

export default async function MintPage(params: ComicIssuePageParams) {
  return <div>{params.params.id}</div>
}
