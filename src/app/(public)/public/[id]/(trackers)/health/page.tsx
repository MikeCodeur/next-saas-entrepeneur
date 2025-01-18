import HealthDashboard from '@/app/(app)/health/health-dashboard'
import {canReadHealth} from '@/services/authorization/health-authorization'
import {getYearsHealthsByUid} from '@/services/health-service'
import {notFound, redirect} from 'next/navigation'

type SearchParams = Promise<{
  healthYear?: string
  healthWeek?: string
  page?: string
  pageSize?: string
}>

type Params = Promise<{
  id?: string
}>

const Page = async (props: {params: Params; searchParams?: SearchParams}) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const userId = params?.id

  if (!userId) notFound()
  const canRead = await canReadHealth(userId)
  if (!canRead) {
    redirect('/restricted')
  }
  const years = await getYearsHealthsByUid(userId)

  if (!years) {
    return (
      <div className="flex  flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-semibold">Pas de résultat</h1>
      </div>
    )
  }
  return (
    <HealthDashboard
      healthYear={searchParams?.healthYear}
      healthWeek={searchParams?.healthWeek}
      page={searchParams?.page}
      pageSize={searchParams?.pageSize}
      userId={userId}
    />
  )
}

export default Page
