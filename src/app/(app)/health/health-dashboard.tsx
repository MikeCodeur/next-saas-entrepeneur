import HealthYearSelect from '@/components/dashboard/trackers/health/health-year-select'
import HealthDataTable from '@/components/dashboard/trackers/health/health-data-table'
import {Separator} from '@/components/ui/separator'
import {
  getHealthsChartbyWeek,
  getHealthsWithPaginationByWeek,
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from '@/services/health-service'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {notFound} from 'next/navigation'
import {getWeekFromLabel} from '@/utils/date-utils'
import {formatedHealthData} from '@/components/charts/chart-utils'
import HealthBarChart from '@/components/dashboard/trackers/health/health-bar-chart'

type HealthDashboardProps = {
  healthYear?: string
  healthWeek?: string
  page?: string
  pageSize?: string
  userId: string
}

const HealthDashboard = async (props: HealthDashboardProps) => {
  const userId = props.userId
  if (!userId) notFound()

  const defaultYear = new Date().getFullYear().toString()

  const page = Number(props?.page) || 1
  const limit = Number(props?.pageSize) || DATA_ROWS_PER_PAGE

  const years = (await getYearsHealthsByUid(userId)) ?? [
    {year: new Date().getFullYear().toString()},
  ]

  const requestedYear = props?.healthYear
  const healthYear =
    requestedYear && years.some((y) => y.year === requestedYear)
      ? requestedYear
      : years?.[0]?.year || defaultYear

  const weeks = (await getWeeksHealthsByYear(healthYear, userId)) ?? []

  const requestedWeek = props?.healthWeek
  const healthWeek =
    requestedWeek && weeks.some((w) => w.week === requestedWeek)
      ? requestedWeek
      : weeks?.[0]?.week

  const hasCurrentWeek = weeks?.find((week) => week.week === healthWeek)?.week

  const weekFromLabel = getWeekFromLabel(healthWeek, healthYear)
  const healthData = await getHealthsWithPaginationByWeek(
    weekFromLabel,
    healthYear,
    userId,
    page,
    limit
  )

  const healths = await getHealthsChartbyWeek(healthYear, weekFromLabel, userId)
  const healthsFormatted = formatedHealthData(healths, 'week')

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Health</h1>
      <Separator className="my-4" />

      <HealthYearSelect
        years={years}
        currentYear={healthYear}
        currentWeek={healthWeek}
        weeks={weeks}
      >
        <HealthBarChart data={healthsFormatted} />
        {hasCurrentWeek ? (
          <HealthDataTable healthTable={healthData} uid={userId} />
        ) : (
          <div>No data for this week</div>
        )}
      </HealthYearSelect>
    </div>
  )
}

export default HealthDashboard
