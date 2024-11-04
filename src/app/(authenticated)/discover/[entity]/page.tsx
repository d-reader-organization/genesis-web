import { BaseLayout } from '@/components/layout/BaseLayout'

interface Params {
  entity: string
}

export default function DiscoverPage({ params }: { params: Params }) {
  return <BaseLayout>Discover {params.entity}</BaseLayout>
}
