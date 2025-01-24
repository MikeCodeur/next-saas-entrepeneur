import {getUserIdDal} from '@/app/dal/user-dal'
import {Separator} from '@/components/ui/separator'
import {notFound} from 'next/navigation'
import {
  getFinancesChartByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service'
import {
  getHealthsChartbyWeek,
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from '@/services/health-service'
import {
  formatedFinanceData,
  formatedHealthData,
} from '@/components/charts/chart-utils'
import FinanceYearSelect from '@/components/dashboard/trackers/finance/finance-year-select'
import HealthYearSelect from '@/components/dashboard/trackers/health/health-year-select'
import FinanceLineChart from '@/components/dashboard/trackers/finance/finance-line-chart'
import HealthBarChart from '@/components/dashboard/trackers/health/health-bar-chart'
import {getWeekFromLabel} from '@/utils/date-utils'

type SearchParams = Promise<{
  financeYear?: string
  healthYear?: string
  healthWeek?: string
}>

export default async function Page(props: {searchParams?: SearchParams}) {
  const searchParams = await props.searchParams
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const defaultYear = new Date().getFullYear().toString()

  // Finance data
  const financeYears = (await getYearsFinancesByUid(userId)) ?? [
    {year: defaultYear},
  ]
  const requestedFinanceYear = searchParams?.financeYear
  const financeYear =
    requestedFinanceYear &&
    financeYears.some((y) => y.year === requestedFinanceYear)
      ? requestedFinanceYear
      : financeYears[0]?.year || defaultYear

  // Health data
  const healthYears = (await getYearsHealthsByUid(userId)) ?? [
    {year: defaultYear},
  ]
  const requestedHealthYear = searchParams?.healthYear
  const healthYear =
    requestedHealthYear &&
    healthYears.some((y) => y.year === requestedHealthYear)
      ? requestedHealthYear
      : healthYears[0]?.year || defaultYear

  const weeks = (await getWeeksHealthsByYear(healthYear, userId)) ?? []
  const requestedWeek = searchParams?.healthWeek
  const healthWeek =
    requestedWeek && weeks.some((w) => w.week === requestedWeek)
      ? requestedWeek
      : weeks[0]?.week

  // 🐶 Fais les appels à la base de données
  // const financesForChart = await getFinancesChartByYear(financeYear, userId)
  // const financeFormatted = formatedFinanceData(financesForChart, 'month')

  // const weekFromLabel = getWeekFromLabel(healthWeek, healthYear)
  // const healths = await getHealthsChartbyWeek(healthYear, weekFromLabel, userId)
  // const healthsFormatted = formatedHealthData(healths, 'week')

  return (
    <div className="flex w-full flex-col justify-center gap-8 pb-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Separator className="my-4" />

      <div className="space-y-8">
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">Finances</h2>
          {/* 🐶 Appelle les composants `FinanceYearSelect` et `FinanceLineChart` */}
          {/* <FinanceYearSelect years={financeYears} currentYear={financeYear}>
            <FinanceLineChart data={financeFormatted} />
          </FinanceYearSelect> */}
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">Santé</h2>
          {/* 🐶 Appelle les composants `HealthYearSelect` et `HealthBarChart` */}
          {/* <HealthYearSelect
            years={healthYears}
            currentYear={healthYear}
            currentWeek={healthWeek}
            weeks={weeks}
          >
            <HealthBarChart data={healthsFormatted} />
          </HealthYearSelect> */}
        </div>
      </div>
    </div>
  )
}
