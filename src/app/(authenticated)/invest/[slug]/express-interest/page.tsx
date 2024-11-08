import { BaseLayout } from '@/components/layout/BaseLayout'
import { Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'
import { ExpressInterestSection } from '@/components/invest/ExpressInterestSection'

type Props = {
  params: { slug: string }
}

export default async function ExpressInterestPage({ params }: Props) {
  const { data: project, errorMessage } = await fetchProject(params.slug)

  if (!project || errorMessage) {
    return notFound()
  }

  return (
    <BaseLayout>
      {project.funding.isUserInterested ? (
        <div className='m-auto'>
          <Text as='h2' styleVariant='body-large'>
            You&apos;ve already expressed interest ! 🎉
          </Text>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-8 max-w-screen-md w-full py-8 md:py-16'>
          <div className='text-center space-y-4'>
            <Text as='h4' styleVariant='secondary-heading' fontWeight='medium' className='text-grey-100'>
              If an offering were to be launched for
            </Text>
            <Text as='h1' styleVariant='primary-heading'>
              {project.title}
            </Text>
          </div>

          <div className='w-full max-w-2xl bg-grey-400 rounded-lg p-8 space-y-8'>
            <Text as='h4' styleVariant='secondary-heading' fontWeight='medium' className='text-center'>
              What is the most you would be willing to invest?
            </Text>
            <Text as='p' styleVariant='body-normal' className='text-center'>
              We want to understand how many people are interested in this story. This action won&apos;t start the
              investment process. Expressing interest will incur a $1 fee to prevent spam.
            </Text>
            <ExpressInterestSection slug={params.slug} />
            <Text as='p' styleVariant='body-xsmall' className='text-grey-100' italic>
              *A person&apos;s indication of interest involves no obligation or commitment of any kind. No money or
              other consideration is being solicited, and if sent in response, will not be accepted.
            </Text>
          </div>
        </div>
      )}
    </BaseLayout>
  )
}
