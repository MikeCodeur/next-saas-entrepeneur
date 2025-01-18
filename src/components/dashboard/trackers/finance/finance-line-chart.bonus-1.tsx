'use client'
import {FINANCE_CATEGORIES} from '@/utils/constants'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {Line, LineChart, XAxis} from 'recharts'

const chartConfig: ChartConfig = {
  [FINANCE_CATEGORIES.incomes]: {color: 'hsl(var(--chart-1))'},
  [FINANCE_CATEGORIES.outcomes]: {color: 'hsl(var(--chart-2))'},
  [FINANCE_CATEGORIES.assets]: {color: 'hsl(var(--chart-3))'},
}

type FinanceLineChartProps<T> = {
  data: T[]
}
const FinanceLineChart = <T,>({data}: FinanceLineChartProps<T>) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-96 min-h-[200px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
          left: 12,
          right: 12,
          bottom: 12,
        }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="revenus"
          type="monotone"
          stroke="var(--color-revenus)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="dépenses"
          type="monotone"
          stroke="var(--color-dépenses)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="actifs"
          type="monotone"
          stroke="var(--color-actifs)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default FinanceLineChart
