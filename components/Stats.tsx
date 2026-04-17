import clsx from "clsx"

interface StatsProps {
  icon: React.ReactNode
  label: string
  value: number
  color?: string
}

export default function Stats({
  icon,
  label,
  value,
  color = "bg-cyan-200",
}: StatsProps) {
  return (
    <div className="flex items-start gap-2">
      <div
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-md p-2",
          color
        )}
      >
        {icon}
      </div>
      <div>
        <h5 aria-label="stats label" className="font-semibold">
          {label}:{" "}
        </h5>
        <p aria-label="stats value" className="text-xl font-light">
          {value}
        </p>
      </div>
    </div>
  )
}
