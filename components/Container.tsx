import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("px-8 md:px-16 lg:px-32", className)}>{children}</div>
  )
}
