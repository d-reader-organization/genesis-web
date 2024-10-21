import { ProjectPayout } from "@/models/project"

type Props = {
  summary: ProjectPayout['summary']
}

export const ProjectDescription: React.FC<Props> = ({ summary }) => {
  return <div className='w-full flex flex-col justify-start items-start'>{summary}</div>
}
