type Params = {
  verificationToken: string
}

export default async function Test({ params }: { params: Params }) {
  
  return (
    <main className='flex flex-col w-full justify-center items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8'>
      TEST
    </main>
  )
}
