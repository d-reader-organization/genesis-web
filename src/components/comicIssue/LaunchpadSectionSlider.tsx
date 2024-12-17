import { LaunchpadModel } from '@/models/candyMachine'
import { SectionSlider } from '../shared/SectionSlider'
import { LaunchpadCard } from './cards/LaunchpadCard'

type Props = { items: LaunchpadModel[] }

export const LaunchpadSectionSlider: React.FC<Props> = ({ items }) => {
  return (
    <SectionSlider title='Launchpad'>
      {items.map((launchpadItem) => (
        <div key={launchpadItem.id} className='flex gap-9 pr-4 md:pr-6 sm:flex-[0_0_50%] md:flex-[0_0_33.333%]'>
          <LaunchpadCard launchpadItem={launchpadItem} />
        </div>
      ))}
    </SectionSlider>
  )
}
