import { BaseLayout } from '@/components/layout/BaseLayout'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'

const EXPRESS_INTEREST_OPTIONS = [
  { label: '$20', value: 20 },
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: '$2,500', value: 2500 },
]

type Props = {
  params: { slug: string }
}

export default async function ExpressInterestPage({ params }: Props) {
  const { data: project, errorMessage } = await fetchProject(params.slug)

  // "other" option should open a text input
  // we need to pull in the data from the project

  const onSubmit = () => {
    // send API request with the selected amount
    // throw confetti after submitting
    // redirectTo after a couple of seconds
    return
  }

  if (!project || errorMessage) {
    return notFound()
  }

  return (
    <BaseLayout>
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
            What is the most you would be interested in investing?
          </Text>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {EXPRESS_INTEREST_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant='outline'
                className='h-12 text-xl border-yellow-500 hover:bg-yellow-500 hover:text-black'
              >
                {option.label}
              </Button>
            ))}
            <Button variant='outline' className='h-12 text-xl border-yellow-500 hover:bg-yellow-500 hover:text-black'>
              Other
            </Button>
          </div>

          <Button className='w-full h-12 bg-yellow-500 text-black'>Submit</Button>
          <Text as='p' styleVariant='body-xsmall' className='text-grey-100' italic>
            *A person's indication of interest involves no obligation or commitment of any kind. No money or other
            consideration is being solicited, and if sent in response, will not be accepted.
          </Text>
        </div>
      </div>
    </BaseLayout>
  )
}
