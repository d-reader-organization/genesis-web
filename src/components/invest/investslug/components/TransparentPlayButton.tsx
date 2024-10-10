const TransparentPlayButton = () => {
  return (
    <button className='relative flex items-center justify-center w-[193px] h-[193px] rounded-full bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-200'>
      <div
        className='absolute inset-0 rounded-full backdrop-blur-[11.90px]'
        style={{ backgroundColor: 'rgba(19, 19, 19, 0.7)' }}
      />
      <svg
        className='w-12 h-12 text-white z-10'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M6.5 5.5a1 1 0 011.57-.82l6 4a1 1 0 010 1.64l-6 4A1 1 0 016 14.5v-8a1 1 0 01.5-.82z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  )
}

export default TransparentPlayButton
