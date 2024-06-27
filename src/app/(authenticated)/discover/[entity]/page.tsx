import { Navigation } from '@/components/layout/Navigation'

interface Params {
  entity: string
}

function DiscoverPage({ params }: { params: Params }) {
  return (
    <>
      <Navigation />
      <div>Discover</div>
    </>
  )
}

export default DiscoverPage
