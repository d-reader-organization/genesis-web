interface Props extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
  itemOrder: number
}

export const AnimatedGridItem: React.FC<Props> = ({ className, children, animate = false, itemOrder, ...props }) => {
  return (
    <div className={className} style={{ transitionDelay: animate ? `${(itemOrder + 1) * 100}ms` : '0ms' }} {...props}>
      {children}
    </div>
  )
}
