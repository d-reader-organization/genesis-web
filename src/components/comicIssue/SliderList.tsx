import { ComicIssueCard } from './cards/Card'
import { ComicIssue } from '@/models/comicIssue'
import { CustomSlider } from '../shared/CustomSlider'
import { SliderType } from '@/enums/sliderType'

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
