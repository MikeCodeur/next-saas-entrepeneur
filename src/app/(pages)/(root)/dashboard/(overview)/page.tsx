import {
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from "@/services/health-service"

import NoDataCard from "@/app/(pages)/(root)/_components/no-data-card"
import {getYearsFinancesByUid} from "@/services/finance-service"
import {PageProps} from "@/types/app-types"
import FinanceChart from "@root/_components/dashboard/(trackers)/finance/finance-chart"
import FinanceChartTrigger from "@root/_components/dashboard/(trackers)/finance/finance-chart-trigger"
import HealthChart from "@root/_components/dashboard/(trackers)/health/health-chart"
import HealthChartTrigger from "@root/_components/dashboard/(trackers)/health/health-chart-trigger"
import {ChartSkeleton} from "@root/_components/dashboard/(trackers)/skeletons/chart-skeleton"
import {Suspense} from "react"
import {getUserIdDal} from "@/app/dal/user-dal"
import {notFound} from "next/navigation"
import withAuth from "@/app/components/auth/withAuth"

export type OverviewProps = Promise<{
  financeYear: string
  healthYear: string
  healthWeek: string
}>
const Page = async (props: PageProps<OverviewProps, undefined>) => {
  const searchParams = await props.searchParams
  const userId = await getUserIdDal()
  if (!userId) notFound()
  // promise all

  const fyears = await getYearsFinancesByUid(userId)
  const hyears = await getYearsHealthsByUid(userId)
  // const weeks = await getWeeksHealthsByYear(
  //   searchParams?.healthYear ?? new Date().getFullYear().toString(),
  //   userId
  // )

  //finance init
  const hasCurrentfinanceYear = fyears?.find(
    (year) => year.year === searchParams?.financeYear
  )?.year
  const currentFinanceYear = hasCurrentfinanceYear
    ? searchParams?.financeYear
    : fyears?.[0].year ?? undefined
  //heath Init

  const hasCurrentHealthYear = hyears?.find(
    (year) => year.year === searchParams?.healthYear
  )?.year
  const currentHealthYear = hasCurrentHealthYear
    ? searchParams?.healthYear
    : hyears?.[0].year ?? undefined

  let weeks

  if (hasCurrentHealthYear && searchParams?.healthYear) {
    weeks = await getWeeksHealthsByYear(searchParams?.healthYear, userId)
  } else if (hyears?.[0].year) {
    weeks = await getWeeksHealthsByYear(hyears?.[0].year, userId)
  }
  const hasCurrentWeek = !!weeks?.some(
    (weeks) => weeks.week === searchParams?.healthWeek
  )
  const currentWeek = hasCurrentWeek
    ? searchParams?.healthWeek
    : weeks?.[0].week ?? undefined

  console.log("currentWeek", currentWeek)
  console.log("currentHealthYear", currentHealthYear)
  console.log("weeks", weeks)

  return (
    <>
      {hyears && weeks ? (
        <HealthChartTrigger years={hyears} weeks={weeks} uid={userId}>
          <Suspense fallback={<ChartSkeleton />}>
            <HealthChart
              year={currentHealthYear}
              week={currentWeek}
              uid={userId}
            />
          </Suspense>
        </HealthChartTrigger>
      ) : (
        <NoDataCard title="Santé" />
      )}
      {fyears ? (
        <FinanceChartTrigger years={fyears}>
          <Suspense fallback={<ChartSkeleton />}>
            <FinanceChart year={currentFinanceYear} uid={userId} />
          </Suspense>
        </FinanceChartTrigger>
      ) : (
        <NoDataCard title="Finance" />
      )}
    </>
  )
}

export default withAuth(Page)
