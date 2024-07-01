import { ComicIssueItem } from './ComicIssueItem'
import { ComicIssue } from '@/models/comicIssue'
import { CustomSlider } from '../shared/CustomSlider'
import { SliderType } from '@/enums/sliderType'

interface Props {
  comicIssues: ComicIssue[]
}

export const ComicIssueList: React.FC<Props> = ({ comicIssues }) => (
  <CustomSlider slider={SliderType.comicIssueList}>
    {comicIssues.map((issue) => (
      <ComicIssueItem key={issue.id} comicIssue={issue} />
    ))}
  </CustomSlider>
)
