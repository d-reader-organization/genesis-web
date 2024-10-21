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
  daysLeft: number // this should be a date
}

export type ProjectPayout = {
  roiPercent: number
  daysForRoi: number // this should be a date
  summary: string
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
