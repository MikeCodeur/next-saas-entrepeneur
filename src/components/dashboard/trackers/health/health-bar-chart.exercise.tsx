'use client'
//1. 🚀 Créer le graphique en barre
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {Bar, BarChart, XAxis, YAxis} from 'recharts'

const chartConfig = {
  calories: {
    label: 'calories',
    color: 'hsl(var(--chart-1))',
  },
  // 🐶 continue la configuration pour le poids et le temps
  // poids: {
  //   label: 'poids',
  //   color: 'hsl(var(--chart-2))',
  // },
  // temps: {
  //   label: 'temps',
  //   color: 'hsl(var(--chart-3))',
  // },
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
        {/* 🐶 Ajoute les axes X et Y */}
        {/* <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        /> */}

        {/* 🐶 Ajoute les axes  et Y (optionnel)*/}
        {/* <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={'calories'}
          yAxisId={'calories'}
          hide={true}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={'poids'}
          yAxisId={'poids'}
          hide={true}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dataKey={'temps'}
          yAxisId={'temps'}
          hide={true}
        /> */}

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {/* 🐶 Ajoute les props pour les barres */}
        <Bar
          dataKey="calories"
          // fill="var(--color-calories)"
          // radius={4}
          // yAxisId={'calories'}
        />
        {/* 🐶 Ajoute les barres */}
        {/* 
        <Bar
          dataKey="poids"
          fill="var(--color-poids)"
          radius={4}
          yAxisId={'poids'}
        />
        <Bar
          dataKey="temps"
          fill="var(--color-temps)"
          radius={4}
          yAxisId={'temps'}
        /> */}
      </BarChart>
    </ChartContainer>
  )
}

export default HealthBarChart
