import {ChartSkeleton} from "../skeletons/chart-skeleton"
import DataTableSkeleton from "../skeletons/data-table-skeleton"
import HealthChart from "./health-chart"
import HealthChartTrigger from "./health-chart-trigger"
import HealthDataTable from "./health-data-table"
import {Separator} from "@/app/components/ui/separator"
import {Suspense} from "react"
import {getWeeksHealthsByYear} from "@/services/health-service"

type HealthDashboardProps = {
  healthYear?: string
  healthWeek?: string
  years?: {
    year: string
  }[]
  uid: string
  page: number
}
const HealthDashboard = async ({
  healthYear,
  healthWeek,
  years,
  uid,
  page,
}: HealthDashboardProps) => {
  const hasYear = !!years

  if (!hasYear) {
    return (
      <div className="flex w-full flex-col justify-center gap-4 pb-4">
        <h1 className="text-2xl font-semibold">Santé</h1>
        <Separator className="my-4" />
        <Suspense fallback={<DataTableSkeleton />}>
          <HealthDataTable
            year={undefined}
            week={undefined}
            uid={uid}
            page={page}
          />
        </Suspense>
      </div>
    )
  }
  const hasCurrentYear = years?.find((year) => year.year === healthYear)?.year
  const currentYear = hasCurrentYear ? healthYear : years?.[0].year ?? undefined
  let weeks

  if (hasCurrentYear && healthYear) {
    weeks = await getWeeksHealthsByYear(healthYear, uid)
  } else if (years?.[0].year) {
    weeks = await getWeeksHealthsByYear(years?.[0].year, uid)
  }
  const hasCurrentWeek = !!weeks?.some((weeks) => weeks.week === healthWeek)
  const currentWeek = hasCurrentWeek ? healthWeek : weeks?.[0].week ?? undefined

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Santé</h1>
      <Separator className="my-4" />
      {hasYear && weeks && (
        <HealthChartTrigger
          years={years}
          weeks={weeks}
          currentYear={currentYear}
          currentWeek={currentWeek}
          uid={uid}
        >
          {/* <Suspense fallback={<ChartSkeleton />}>
            <HealthChart year={currentYear} week={currentWeek} uid={uid} />
          </Suspense> */}
          <HealthChart year={currentYear} week={currentWeek} uid={uid} />
        </HealthChartTrigger>
      )}
      <Suspense fallback={<DataTableSkeleton />}>
        <HealthDataTable
          year={currentYear}
          week={currentWeek}
          uid={uid}
          page={page}
        />
      </Suspense>
    </div>
  )
}

export default HealthDashboard
