import { BaseLayout } from '@/components/layout/BaseLayout'

type Props = {
  params: { slug: string }
}

export default async function PayoutPage({ params }: Props) {
  return (
    <BaseLayout>
      <div>Payout {params.slug}</div>
    </BaseLayout>
  )
}
