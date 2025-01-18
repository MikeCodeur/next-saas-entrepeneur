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
  revenus: {color: 'hsl(var(--chart-1))'},
  // 🐶 Defini la configuration pour les dépenses et les actifs
  // dépenses: {color: 'hsl(var(--chart-2))'},
  // actifs: {color: 'hsl(var(--chart-3))'},
}

type FinanceLineChartProps<T> = {
  data: T[]
}
const FinanceLineChart = <T,>({data}: FinanceLineChartProps<T>) => {
  return (
    <>Chart Todo</>
    // 🐶 Crée un ChartContainer
    //
    // <ChartContainer
    //   config=// 🐶 Utilise 'chartConfig'
    //   className="max-h-96 min-h-[200px] w-full"
    // >
    // 🐶 Ajoute un LineChart
    //
    //   <LineChart
    //     accessibilityLayer
    //     // 🐶 Ajoute les données
    //     data=...
    //     margin={{
    //       top: 12,
    //       left: 12,
    //       right: 12,
    //       bottom: 12,
    //     }}
    //   >
    // 🐶 Ajoute un XAxis pour les mois
    //
    //     <XAxis
    //       dataKey // utilise 'month'
    //       tickLine={false}
    //       axisLine={false}
    //       tickMargin={8}
    //       tickFormatter={(value) => value}
    //     />
    // 🐶 Ajoute un ChartTooltip
    //
    //     <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    // 🐶 Ajoute un ChartLegend
    //
    //     <ChartLegend content={<ChartLegendContent />} />
    //
    // 🐶 Ajoute un Line pour les revenus
    //
    //     <Line
    //       dataKey="revenus"
    //       type="monotone"
    //       stroke="var(--color-revenus)"
    //       strokeWidth={2}
    //       dot={false}
    //     />
    // 🐶 Ajoute un Line pour les dépenses
    // 🐶 Ajoute un Line pour les actifs

    //   </LineChart>
    // </ChartContainer>
  )
}

export default FinanceLineChart
