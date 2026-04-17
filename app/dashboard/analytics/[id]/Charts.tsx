"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import ChartWrapper from "@/components/ChartWrapper"
import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts"
import { type ChartConfig } from "@/components/ui/chart"
import { AlertCircle, MousePointer2, MousePointerClick } from "lucide-react"
import Stats from "@/components/Stats"
import { format, subDays } from "date-fns"
import { useEffect, useState } from "react"
import { ActionState } from "@/lib/schemas/action"
import { Analytics } from "@/lib/schemas/analytic"
import { getAnalytics } from "../../_actions/analytic.action"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUserStore } from "@/lib/store/user"

interface ChartsProps {
  id: string
}

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const countryChartConfig = {
  US: {
    label: "United States",
    color: "var(--chart-1)",
  },
  ID: {
    label: "Indonesia",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function Charts({ id }: ChartsProps) {
  const { user } = useUserStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ActionState<Analytics>>({
    error: null,
    payload: null,
    success: false,
  })

  useEffect(() => {
    if (user.accessToken === "") return
    ;(async () => {
      try {
        setLoading(true)
        setData(await getAnalytics(id, user.accessToken))
        setLoading(false)
      } catch (err: unknown) {
        setLoading(false)
        setData({
          error:
            err instanceof Error ? err.message : "An unknown error occurred",
          payload: null,
          success: false,
        })
      }
    })()
  }, [id, user.accessToken])

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner className="size-8 text-cyan-400" data-testid="loading" />
      </div>
    )
  }
  if (!data.payload) {
    return (
      <div className="flex justify-center">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>You have no analytics data</AlertTitle>
        </Alert>
      </div>
    )
  }
  if (!data.success) {
    return (
      <div className="flex justify-center">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <ChartWrapper title="Link Stats" description="All time stats">
        <div className="flex justify-start gap-2">
          <Stats
            icon={<MousePointer2 className="size-6 text-cyan-800" />}
            label="Total Clicks"
            value={data.payload?.stats.totalClicks}
          />
          <Stats
            icon={<MousePointerClick className="size-6 text-purple-800" />}
            color="bg-purple-400"
            label="Unique Clicks"
            value={data.payload?.stats.uniqueClicks}
          />
        </div>
      </ChartWrapper>
      <div className="flex w-full flex-col flex-wrap gap-2 md:flex-row">
        <ChartWrapper
          title="Click by Dates - 30 days"
          description={
            format(subDays(new Date(), 30), "dd-MM-yyyy") +
            " - " +
            format(new Date(), "dd-MM-yyyy")
          }
        >
          <ChartContainer config={chartConfig}>
            <LineChart data={data.payload?.linkByDate} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => new Date(v).toLocaleDateString()}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="clicks" />
            </LineChart>
          </ChartContainer>
        </ChartWrapper>
        <ChartWrapper
          title="Click by Hours - 24 hours"
          description={"Click by hours for the last 24 hours."}
        >
          <ChartContainer config={chartConfig}>
            <LineChart data={data.payload?.linkByHour} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => new Date(v).toLocaleTimeString()}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="clicks" />
            </LineChart>
          </ChartContainer>
        </ChartWrapper>
        <ChartWrapper
          title="Click by Country"
          description="Click by country all time"
        >
          <ChartContainer
            config={countryChartConfig}
            className="relative min-h-42 w-full"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Pie
                data={data.payload.countries}
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius="50%"
                paddingAngle={5}
                dataKey="clicks"
                nameKey="country"
              />
            </PieChart>
          </ChartContainer>
        </ChartWrapper>
      </div>
    </div>
  )
}
