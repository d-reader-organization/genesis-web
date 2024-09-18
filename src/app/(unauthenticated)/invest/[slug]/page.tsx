import { BaseLayout } from '@/components/layout/BaseLayout'

type Props = {
  params: { slug: string }
}

export default async function InvestPage({ params }: Props) {
  return (
    <BaseLayout>
      <div>Invest details {params.slug}</div>
    </BaseLayout>
  )
}
