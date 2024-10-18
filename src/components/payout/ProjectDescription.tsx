type ProjectDescriptionProps = {
  description: string
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {
  return <div className='w-full flex flex-col justify-start items-start'>{description}</div>
}
