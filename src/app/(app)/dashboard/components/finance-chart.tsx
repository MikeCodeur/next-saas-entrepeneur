import {
  getFinancesChartByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service'
import {formatedFinanceData} from '@/components/charts/chart-utils'
import FinanceYearSelect from '@/components/dashboard/trackers/finance/finance-year-select'
import FinanceLineChart from '@/components/dashboard/trackers/finance/finance-line-chart'

export default async function FinanceChart({
  userId,
  financeYear,
}: {
  userId: string
  financeYear?: string
}) {
  const defaultYear = new Date().getFullYear().toString()
  const financeYears = (await getYearsFinancesByUid(userId)) ?? [
    {year: defaultYear},
  ]

  const year =
    financeYear && financeYears.some((y) => y.year === financeYear)
      ? financeYear
      : financeYears[0]?.year || defaultYear

  const financesForChart = await getFinancesChartByYear(year, userId)
  const financeFormatted = formatedFinanceData(financesForChart, 'month')

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Finances</h2>
      <FinanceYearSelect years={financeYears} currentYear={year}>
        <FinanceLineChart data={financeFormatted} />
      </FinanceYearSelect>
    </div>
  )
}
