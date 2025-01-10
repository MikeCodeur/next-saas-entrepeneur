import withAuth from "@/app/components/auth/withAuth"
import {getUserIdDal} from "@/app/dal/user-dal"
import {
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from "@/services/health-service"
import {PageProps} from "@/types/app-types"
import HealthDashboard from "@root/_components/dashboard/(trackers)/health"
import {notFound} from "next/navigation"

type HealthProps = Promise<{
  healthYear?: string
  healthWeek?: string
  page?: string
}>
const Page = async (props: PageProps<HealthProps, undefined>) => {
  const searchParams = await props.searchParams
  const userId = await getUserIdDal()
  if (!userId) notFound()
  const years = await getYearsHealthsByUid(userId)

  const hasCurrentYear = years?.find(
    (year) => year.year === searchParams?.healthYear
  )?.year
  const currentYear = hasCurrentYear
    ? searchParams?.healthYear
    : years?.[0].year ?? undefined
  let weeks

  if (hasCurrentYear && searchParams?.healthYear) {
    weeks = await getWeeksHealthsByYear(searchParams?.healthYear, userId)
  } else if (years?.[0].year) {
    weeks = await getWeeksHealthsByYear(years?.[0].year, userId)
  }
  const hasCurrentWeek = !!weeks?.some(
    (weeks) => weeks.week === searchParams?.healthWeek
  )
  const currentWeek = hasCurrentWeek
    ? searchParams?.healthWeek
    : weeks?.[0].week ?? undefined
  const page = Number(searchParams?.page) || 1

  return (
    <HealthDashboard
      healthYear={currentYear}
      healthWeek={currentWeek}
      years={years}
      uid={userId}
      page={page}
    />
  )
}

export default withAuth(Page)
