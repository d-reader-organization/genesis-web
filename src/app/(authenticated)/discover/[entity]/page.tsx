import { Navigation } from '@/components/layout/Navigation'

interface Params {
  entity: string
}

function DiscoverPage({ params }: { params: Params }) {
  return (
    <>
      <Navigation />
      <div>Discover {params.entity}</div>
    </>
  )
}

export default DiscoverPage
