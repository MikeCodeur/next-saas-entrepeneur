import {getUserIdDal} from '@/app/dal/user-dal'
import {notFound} from 'next/navigation'
import HealthDashboard from './health-dashboard'

type SearchParams = Promise<{
  healthYear?: string
  healthWeek?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams

  return (
    <HealthDashboard
      healthYear={params?.healthYear}
      healthWeek={params?.healthWeek}
      page={params?.page}
      pageSize={params?.pageSize}
      userId={userId}
    />
  )
}

export default Page
