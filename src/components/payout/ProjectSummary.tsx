import { ProjectPayout } from '@/models/project'

type Props = {
  summary: ProjectPayout['summary']
}

export const ProjectSummary: React.FC<Props> = ({ summary }) => {
  return <div className='w-full flex flex-col justify-start items-start max-md:text-sm'>{summary}</div>
}
