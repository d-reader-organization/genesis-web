import { Navigation } from '@/components/layout/Navigation'

interface Params {
  entity: string
}

function DiscoverPage({ params }: { params: Params }) {
  return (
    <>
      <Navigation />
      <main className='pt-24 flex flex-col justify-center'>
        <p>Discover {params.entity}</p>
      </main>
    </>
  )
}

export default DiscoverPage
