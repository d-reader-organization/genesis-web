import HeartOutlinedIcon from 'public/assets/vector-icons/heart-outlined-icon.svg'
import HeartSolidIcon from 'public/assets/vector-icons/heart-solid-icon.svg'
import clsx from 'clsx'

interface Props extends React.SVGProps<SVGSVGElement> {
  solid?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const HeartIcon: React.FC<Props> = ({ solid = false, size = 'md', className, ...props }) => {
  const sharedClasses = {
    'h-[14px]': size === 'xs',
    'h-4': size === 'sm',
    'h-[18px]': size === 'md',
    'h-5': size === 'lg',
    'h-[22px]': size === 'xl',
  }

  if (solid) return <HeartSolidIcon className={clsx(className, 'text-red-500', sharedClasses)} {...props} />
  else return <HeartOutlinedIcon className={clsx(className, 'heart-icon--outlined', sharedClasses)} {...props} />
}
