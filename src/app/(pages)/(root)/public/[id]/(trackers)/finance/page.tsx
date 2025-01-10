import FinanceDashboard from "@root/_components/dashboard/(trackers)/finance"
import {PageProps} from "@/types/app-types"
import {getYearsFinancesByUid} from "@/services/finance-service"
import {notFound} from "next/navigation"

type FinancePropsSearch = Promise<{
  financeYear?: string
  page?: string
}>
type FinancePropsParams = Promise<{
  id?: string
}>
const Page = async (
  props: PageProps<FinancePropsSearch, FinancePropsParams>
) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const userId = params?.id
  console.log("userId", userId)
  if (!userId) notFound()
  const years = await getYearsFinancesByUid(userId)
  const page = Number(searchParams?.page) || 1

  return (
    <FinanceDashboard
      financeYear={searchParams?.financeYear}
      years={years}
      uid={userId}
      page={page}
    />
  )
}

export default Page
