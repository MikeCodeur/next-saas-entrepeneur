import HealthDashboard from "@root/_components/dashboard/(trackers)/health"
import {PageProps} from "@/types/app-types"
import {getYearsHealthsByUid} from "@/services/health-service"
import {notFound} from "next/navigation"

type HealthPropsSearch = Promise<{
  healthYear?: string
  healthWeek?: string
  page?: string
}>
type HealthPropsParams = Promise<{
  id?: string
}>
const Page = async (props: PageProps<HealthPropsSearch, HealthPropsParams>) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const userId = params?.id

  if (!userId) notFound()
  const years = await getYearsHealthsByUid(userId)
  const page = Number(searchParams?.page) || 1

  return (
    <HealthDashboard
      healthYear={searchParams?.healthYear}
      healthWeek={searchParams?.healthWeek}
      years={years}
      uid={userId}
      page={page}
    />
  )
}

export default Page
