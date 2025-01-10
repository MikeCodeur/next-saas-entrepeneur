import FinanceDashboard from "@/app/(pages)/(root)/_components/dashboard/(trackers)/finance"
import withAuth from "@/app/components/auth/withAuth"
import {getUserIdDal} from "@/app/dal/user-dal"
import {getYearsFinancesByUid} from "@/services/finance-service"
import {PageProps} from "@/types/app-types"
import {notFound} from "next/navigation"

type FinanceProps = Promise<{
  financeYear?: string
  page?: string
}>
const Page = async (props: PageProps<FinanceProps, undefined>) => {
  const searchParams = await props.searchParams
  const userId = await getUserIdDal()
  if (!userId) notFound()
  const years = await getYearsFinancesByUid(userId)
  const hasCurrentYear = years?.find(
    (year) => year.year === searchParams?.financeYear
  )?.year
  const currentYear = hasCurrentYear
    ? searchParams?.financeYear
    : years?.[0].year ?? undefined
  const page = Number(searchParams?.page) || 1
  console.log("currentYear", currentYear)
  return (
    <FinanceDashboard
      financeYear={currentYear}
      years={years}
      uid={userId}
      page={page}
    />
  )
}

export default withAuth(Page)
