type ProjectInfoProps = {
  description: string
}

export const ProjectDescription: React.FC<ProjectInfoProps> = ({ description }) => {
  return (
    <section className='w-full flex flex-col justify-start items-start'>
      <div className='flex flex-col'>
        {description}
      </div>
    </section>
  )
}