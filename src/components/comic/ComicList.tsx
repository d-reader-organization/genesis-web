import ComicItem from './ComicItem'
import { Comic } from '@/models/comic'
import { CustomSlider } from '../shared/CustomSlider'
import { SliderType } from '@/enums/sliderType'

type Props = {
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
  comics: Comic[]
}

export const ComicList: React.FC<Props> = ({ priority, fetchPriority, comics }) => (
  <CustomSlider slider={SliderType.comicList}>
    {comics.map((comic) => (
      <ComicItem key={comic.slug} comic={comic} priority={priority} fetchPriority={fetchPriority} />
    ))}
  </CustomSlider>
)
