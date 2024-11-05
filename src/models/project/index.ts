export type ProjectCreator = {
  name: string
  avatar: string
}

export type ProjectInfo = {
  section: string
  text: string
  image?: string
}[]

export type ProjectFunding = {
  pledgedAmount: number
  raiseGoal: number
  numberOfBackers: number
  numberOfInterestedInvestors: number
  startDate?: string
  endDate?: string
}

export type ProjectPayout = {
  roiPercent: number
  daysForRoi: number
  summary: string
  revenue: number
  numberOfBuyers: number
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  banner: string
  cover: string
  logo: string
  tags: string[]
  creator: ProjectCreator
  info: ProjectInfo
  funding: ProjectFunding
  payout?: ProjectPayout
}

export type SuccessfulProject = Project & { payout: ProjectPayout }

export function isSuccessfulProject(project: Project | undefined): project is SuccessfulProject {
  return project !== undefined && 'payout' in project
}
