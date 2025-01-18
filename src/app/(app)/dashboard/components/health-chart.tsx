import {
  getHealthsChartbyWeek,
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from '@/services/health-service'
import {formatedHealthData} from '@/components/charts/chart-utils'
import HealthYearSelect from '@/components/dashboard/trackers/health/health-year-select'
import HealthBarChart from '@/components/dashboard/trackers/health/health-bar-chart'
import {getWeekFromLabel} from '@/utils/date-utils'

export default async function HealthChart({
  userId,
  healthYear,
  healthWeek,
}: {
  userId: string
  healthYear?: string
  healthWeek?: string
}) {
  const defaultYear = new Date().getFullYear().toString()
  const healthYears = (await getYearsHealthsByUid(userId)) ?? [
    {year: defaultYear},
  ]

  const year =
    healthYear && healthYears.some((y) => y.year === healthYear)
      ? healthYear
      : healthYears[0]?.year || defaultYear

  const weeks = (await getWeeksHealthsByYear(year, userId)) ?? []
  const week =
    healthWeek && weeks.some((w) => w.week === healthWeek)
      ? healthWeek
      : weeks[0]?.week

  const weekFromLabel = getWeekFromLabel(week, year)
  const healths = await getHealthsChartbyWeek(year, weekFromLabel, userId)
  const healthsFormatted = formatedHealthData(healths, 'week')

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Santé</h2>
      <HealthYearSelect
        years={healthYears}
        currentYear={year}
        currentWeek={week}
        weeks={weeks}
      >
        <HealthBarChart data={healthsFormatted} />
      </HealthYearSelect>
    </div>
  )
}
