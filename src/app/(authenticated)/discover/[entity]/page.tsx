import { BaseLayout } from '@/components/layout/BaseLayout'

interface Params {
  entity: string
}

function DiscoverPage({ params }: { params: Params }) {
  return <BaseLayout>Discover {params.entity}</BaseLayout>
}

export default DiscoverPage