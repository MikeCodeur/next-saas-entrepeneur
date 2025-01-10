"use client"
import {HEALTH_CATEGORIES} from "@/utils/constants"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
import {Bar, BarChart, XAxis, YAxis} from "recharts"

const chartConfig = {
  [HEALTH_CATEGORIES.calories]: {
    label: HEALTH_CATEGORIES.calories,
    color: "hsl(var(--chart-1))",
  },
  [HEALTH_CATEGORIES.poids]: {
    label: HEALTH_CATEGORIES.poids,
    color: "hsl(var(--chart-2))",
  },
  [HEALTH_CATEGORIES.temps]: {
    label: HEALTH_CATEGORIES.temps,
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

type HealthBarChartProps<T> = {
  data: T[]
}
const HealthBarChart = <T,>({data}: HealthBarChartProps<T>) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-96 min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={"calories"}
          yAxisId={"calories"}
          hide={true}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={"poids"}
          yAxisId={"poids"}
          hide={true}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={"temps"}
          yAxisId={"temps"}
          hide={true}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="calories"
          fill="var(--color-calories)"
          radius={4}
          yAxisId={"calories"}
        />
        <Bar
          dataKey="poids"
          fill="var(--color-poids)"
          radius={4}
          yAxisId={"poids"}
        />
        <Bar
          dataKey="temps"
          fill="var(--color-temps)"
          radius={4}
          yAxisId={"temps"}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default HealthBarChart
