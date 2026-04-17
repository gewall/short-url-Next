import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface ChartWrapeprProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function ChartWrapepr({
  title,
  description,
  children,
}: ChartWrapeprProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
    // <div className="rounded-md border px-4 py-2">
    //   <h5 className="my-2 text-lg font-medium">{title}</h5>
    //   {children}
    // </div>
  )
}
