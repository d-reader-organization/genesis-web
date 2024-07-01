import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
  itemOrder: number
}

export const AnimatedGridItem: React.FC<Props> = ({ className, children, animate = false, itemOrder, ...props }) => {
  return (
    // TODO missing theme slide classes
    <div
      className={clsx(className, 'theme-slideX-left', animate ? 'theme-slideX-animate' : '')}
      style={{ transitionDelay: animate ? `${(itemOrder + 1) * 100}ms` : '0ms' }}
      {...props}
    >
      {children}
    </div>
  )
}
