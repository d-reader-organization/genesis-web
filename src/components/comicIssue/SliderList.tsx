import { ComicIssueCard } from './Card'
import { ComicIssue } from '@/models/comicIssue'
import { CustomSlider } from '../shared/CustomSlider'
import { SliderType } from '@/utils/enums'

interface Props {
  comicIssues: ComicIssue[]
}

export const ComicIssueSliderList: React.FC<Props> = ({ comicIssues }) => (
  <CustomSlider slider={SliderType.comicIssueList}>
    {comicIssues.map((issue) => (
      <ComicIssueCard key={issue.id} comicIssue={issue} />
    ))}
  </CustomSlider>
)
