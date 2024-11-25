import { Text } from '../ui'
import ArrowDownIcon from 'public/assets/vector-icons/arrow-down.svg'

interface ShowMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick, disabled, ...buttonProps }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='flex items-center p-2 px-3 max-w-40 max-h-10 mt-6 bg-grey-500 text-grey-100 rounded-xl hover:brightness-110 disabled:opacity-50'
      {...buttonProps}
    >
      {disabled ? (
        <Text as='p' styleVariant='body-large'>
          Loading...
        </Text>
      ) : (
        <div className='flex items-center gap-2 text-grey-100'>
          <Text as='p' styleVariant='body-large' className='flex justify-center items-center gap-1'>
            Show more
          </Text>
          <ArrowDownIcon />
        </div>
      )}
    </button>
  )
}
